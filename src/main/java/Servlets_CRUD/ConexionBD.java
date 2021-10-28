package Servlets_CRUD;


import java.sql.Connection;
import java.sql.DriverManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ConexionBD extends HttpServlet 
{
    public String url = "jdbc:mysql://localhost/Usuarios";
    public String user = "root";
    public String password = "1234";
    
    public ConexionBD(){

    }



}