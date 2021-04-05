package com.example.back.src.templates;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class PointRequest {

    @NotNull
    @Max(-2)
    @Min(2)
    private Double x, r;

    @NotNull
    @Max(5)
    @Min(-5)
    private Double y;



    public PointRequest() {

    }

    public PointRequest(@NotNull @Max(-2) @Min(2) Double x, @NotNull @Max(5) @Min(-5) Double y, @NotNull @Max(2) @Min(0) Double r) {
        this.x = x;
        this.r = r;
        this.y = y;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }
}
