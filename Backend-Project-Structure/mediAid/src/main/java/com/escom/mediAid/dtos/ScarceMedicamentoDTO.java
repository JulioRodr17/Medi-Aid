package com.escom.mediAid.dtos;

public class ScarceMedicamentoDTO {
    private Integer id;
    private String name;

    public ScarceMedicamentoDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
