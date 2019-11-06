package com.tcl.itam_ui.common;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

@Component
public class CsrfSecurityRequestMatcher implements RequestMatcher{
	
	private static AntPathRequestMatcher[] requestMatchers;

    @Value("${csrf.disable.url}")
    private String csrfUrl;

    @PostConstruct
    private void init() {
        String[] csrfUrlArray = csrfUrl.split(",");
        requestMatchers = new AntPathRequestMatcher[csrfUrlArray.length];
        for (int i = 0; i < csrfUrlArray.length; i++) {
            AntPathRequestMatcher antpath = new AntPathRequestMatcher(csrfUrlArray[i]);
            requestMatchers[i] = antpath;
        }
    }

    @Override
    public boolean matches(HttpServletRequest request) {

        String xAuthHeader = request.getHeader("X-Auth-Header");
        if (xAuthHeader != null && !xAuthHeader.trim().isEmpty()) {
            return false;
        }

        for (AntPathRequestMatcher rm : requestMatchers) {
            if (rm.matches(request)) {
                return false;
            }
        }
        return true;
    }
}
