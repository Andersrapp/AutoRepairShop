package com.ar.hotwiredautorepairshop.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

/**
 *
 * @author Anders
 */
@ComponentScan
@EnableAutoConfiguration
@ImportResource("classpath:META-INF/application-context.xml")
public class Main {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext
                = SpringApplication.run(Main.class, args);
    }
}
