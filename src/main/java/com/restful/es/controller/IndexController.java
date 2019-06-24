package com.restful.es.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {
    @RequestMapping("/index")
    public String greeting() {

//        String template = "<!DOCTYPE html SYSTEM \"http://www.thymeleaf.org/dtd/xhtml1-strict-thymeleaf-spring4-4.dtd\">\n" +
//                "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:th=\"http://www.thymeleaf.org\" lang=\"en\">\n" +
//                "<head>\n" +
//                "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"+
//                "  <link rel=\"stylesheet\" href=\"../static/styles/leaflet.css\">\n" +
//                "    <script type=\"text/javascript\" src=\"../resources/static/js/leaflet.js\"></script>\n" +
//                "    <script type=\"text/javascript\" src=\"../static/js/jquery.min.js\"></script>" +
//                "\n" +
//                "  \n" +
//                "<!-- add our additional scripts -->\n" +
//                "<link rel=\"stylesheet\" href=\"../styles/style.css\">\n" +
//                "  <script type=\"text/javascript\" src=\"../js/app.js\"></script>\n" +
//                "\n" +
//                "</head>\n" +
//                "\n" +
//                "<!-- add map to body -->\n" +
//                "<body onload=\"myFunction()\">\n" +
//                "  <script th:src=\"@{/js/functions.js}\" src=\"../js/functions.js\"></script>\n" +
//                "<div id=\"map\"></div>\n" +
//                "</body>\n" +
//                "\n" +
//                "</html>";

        return "index";
    }
}
