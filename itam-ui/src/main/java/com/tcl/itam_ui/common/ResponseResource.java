package com.tcl.itam_ui.common;

public class ResponseResource<T> {

	public static final String R_MSG_EMPTY = "";
	public static final Integer R_CODE_OK = 0;
	public static final Integer R_CODE_ERROR = 1;

	private final Integer responseCode;

	private final String message;

	private T data;

	/**
	* 
	*/
	public ResponseResource() {
		this.message =   ResponseResource.R_MSG_EMPTY  ;
		this.responseCode =   ResponseResource.R_CODE_OK ;
		this.setData(data);

	}

	/**
	 * A Creates a new instance of ResponseResource
	 *
	 * @param code
	 * @param message
	 * @param execDt
	 */
	public ResponseResource(final Integer code, final String message) {

		this.message = message == null ? ResponseResource.R_MSG_EMPTY : message;
		this.responseCode = code == null ? ResponseResource.R_CODE_OK : code;
		//this.setData(data);
	}
	
	public ResponseResource(final Integer code, final String message,T data) {

		this.message = message == null ? ResponseResource.R_MSG_EMPTY : message;
		this.responseCode = code == null ? ResponseResource.R_CODE_OK : code;
		this.setData(data);
	}
	 

	/**
	 * @param data
	 */
	public ResponseResource(T data) {

		this.message =   ResponseResource.R_MSG_EMPTY  ;
		this.responseCode =   ResponseResource.R_CODE_OK ; 
		this.data = data;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {

		return this.message;
	}

	/**
	 * @return the responseCode
	 */
	public Integer getResponseCode() {

		return this.responseCode;
	}

	/**
	 * @return the data
	 */
	public T getData() {
		return data;
	}

	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(T data) {
		this.data = data;
	}

}
