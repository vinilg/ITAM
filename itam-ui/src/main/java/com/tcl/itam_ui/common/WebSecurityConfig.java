package com.tcl.itam_ui.common;

import java.util.HashSet;
import java.util.Set;

import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.validation.Cas20ServiceTicketValidator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.web.CasAuthenticationEntryPoint;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	public static AntPathRequestMatcher[] requestMatchers;

	@Value("${cas.service.login}")
	private String CAS_URL_LOGIN;

	@Value("${cas.service.logout}")
	private String CAS_URL_LOGOUT;

	@Value("${cas.url.prefix}")
	private String CAS_URL_PREFIX;

	@Value("${cas.ticket.validate.url}")
	private String CAS_VALIDATE_URL;

	@Value("${app.service.security}")
	private String CAS_SERVICE_URL;

	@Value("${app.service.home}")
	private String APP_SERVICE_HOME;

	@Value("${app.admin.userName:admin}")
	private String APP_ADMIN_USER_NAME;
	
	@Value("${csrf.repository.cookie.name}")
	private String CSRF_COOKIE_NAME;
	
	@Value("${csrf.repository.header.name}")
	private String CSRF_HEADER_NAME;
	
	@Value("${csrf.disable.url}")
	private String csrfUrl;

	@Bean
	public Set<String> adminList() {
		Set<String> admins = new HashSet<>();
		admins.add(APP_ADMIN_USER_NAME);
		return admins;
	}

	@Bean
	public ServiceProperties serviceProperties() {
		ServiceProperties sp = new ServiceProperties();
		sp.setService(CAS_SERVICE_URL);
		sp.setSendRenew(false);
		return sp;
	}

	@Bean
	public CasAuthenticationProvider casAuthenticationProvider() {
		CasAuthenticationProvider casAuthenticationProvider = new CasAuthenticationProvider();
		casAuthenticationProvider.setAuthenticationUserDetailsService(customUserDetailsService());
		casAuthenticationProvider.setServiceProperties(serviceProperties());
		casAuthenticationProvider.setTicketValidator(cas20ServiceTicketValidator());
		casAuthenticationProvider.setKey("an_id_for_this_auth_provider_only");
		return casAuthenticationProvider;
	}

	@Bean
	public AuthenticationUserDetailsService<CasAssertionAuthenticationToken> customUserDetailsService() {
		return new CustomUserDetailsService(adminList());
	}

	@Bean
	public SessionAuthenticationStrategy sessionStrategy() {
		return new SessionFixationProtectionStrategy();
	}

	@Bean
	public Cas20ServiceTicketValidator cas20ServiceTicketValidator() {
		return new Cas20ServiceTicketValidator(CAS_VALIDATE_URL);
	}

	@Bean
	public CasAuthenticationFilter casAuthenticationFilter() throws Exception {
		CasAuthenticationFilter casAuthenticationFilter = new CasAuthenticationFilter();
		casAuthenticationFilter.setAuthenticationManager(authenticationManager());
		casAuthenticationFilter.setSessionAuthenticationStrategy(sessionStrategy());
		return casAuthenticationFilter;
	}

	public CasAuthenticationEntryPoint casAuthenticationEntryPoint() {
		CasAuthenticationEntryPoint casAuthenticationEntryPoint = new CasAuthenticationEntryPoint();
		casAuthenticationEntryPoint.setLoginUrl(CAS_URL_LOGIN);
		casAuthenticationEntryPoint.setServiceProperties(serviceProperties());
		return casAuthenticationEntryPoint;
	}

	public SingleSignOutFilter singleSignOutFilter() {
		SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
		singleSignOutFilter.setCasServerUrlPrefix(CAS_URL_PREFIX);
		return singleSignOutFilter;
	}

	@Bean
	public LogoutFilter requestCasGlobalLogoutFilter() {
		LogoutFilter logoutFilter = new LogoutFilter(CAS_URL_LOGOUT + "?service=" + APP_SERVICE_HOME, new SecurityContextLogoutHandler());
		logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"));
		return logoutFilter;
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(casAuthenticationProvider());
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/fonts/**").antMatchers("/images/**").antMatchers("/scripts/**")
				.antMatchers("/styles/**").antMatchers("/views/**").antMatchers("/i18n/**").antMatchers("/webjars/**");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.authorizeRequests().antMatchers("/**").authenticated();
	    http.exceptionHandling().authenticationEntryPoint(casAuthenticationEntryPoint());
	    http.addFilter(casAuthenticationFilter());
	    http.csrf().csrfTokenRepository(cookieCsrfRepository());
	    http.csrf().requireCsrfProtectionMatcher(new CsrfSecurityRequestMatcher());
	    http.addFilterBefore(singleSignOutFilter(), CasAuthenticationFilter.class);
		http.addFilterBefore(requestCasGlobalLogoutFilter(), LogoutFilter.class).authorizeRequests();
		
	}
	
	private CookieCsrfTokenRepository cookieCsrfRepository(){
		CookieCsrfTokenRepository repo = new CookieCsrfTokenRepository();
		repo.setCookieHttpOnly(false);
		repo.setCookieName(CSRF_COOKIE_NAME);
		repo.setCookiePath("/");
		repo.setHeaderName(CSRF_HEADER_NAME);
		return repo;
	}
}
