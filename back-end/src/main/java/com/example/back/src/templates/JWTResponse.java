package com.example.back.src.templates;

public class JWTResponse {

    private String token, login;

    public JWTResponse() {}

    public JWTResponse(String token, String login) {
        this.token = token;
        this.login = login;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
