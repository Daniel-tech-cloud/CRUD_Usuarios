package Servlets_CRUD;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Insertar extends HttpServlet 
{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp); //To change body of generated methods, choose Tools | Templates.

        String nombre = req.getParameter("nombre");
        String apPaterno = req.getParameter("apPaterno");
        String apMaterno = req.getParameter("apMaterno");
        String password = req.getParameter("password");
        
        PrintWriter out = resp.getWriter();
        
        try
        {
            ConexionBD db = new ConexionBD();
            
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(db.url, db.user, db.password);
            Statement st = conn.createStatement();
            String query;
            
            //Creamos el query
            query = "INSERT INTO DatosUsuario (nombre, apPaterno, apMaterno) VALUES (" + nombre + ", " + apPaterno + ", " + apMaterno + ")";
            st.executeUpdate(query);
            
            //Creamos el query
            query = "INSERT INTO Usuario (pass) VALUES (" + password + ")";         
            st.executeUpdate(query);
            
            out.print("Usuario ingresado correctamente");

        }
        catch(Exception e){
            e.printStackTrace();
            System.err.println(e.getMessage());
        } 
    }
    
    

}
