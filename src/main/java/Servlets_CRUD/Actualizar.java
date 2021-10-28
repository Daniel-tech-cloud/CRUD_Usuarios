package Servlets_CRUD;

import java.io.IOException;
import static java.lang.System.out;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Actualizar extends HttpServlet { 

 
        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        
        String id = req.getParameter("id");
        String nombre = req.getParameter("nombre");
        String apPaterno = req.getParameter("apPaterno");
        String apMaterno = req.getParameter("apMaterno");
        String password = req.getParameter("password");
        
        
        try
        {
            ConexionBD db = new ConexionBD();            
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(db.url, db.user, db.password);
            PreparedStatement stmt;
            stmt = conn.prepareStatement("UPDATE DatosUsuario SET nombre = ? , apPaterno = ? , apMaterno = ? WHERE id=  ?");
            stmt.setString(1,nombre);
            stmt.setString(2,apPaterno);
            stmt.setString(3,apMaterno);
            stmt.setString(4,id);
            stmt.executeUpdate();           
                      
            stmt = conn.prepareStatement("UPDATE Usuario SET pass = ? WHERE  id = ?");
            stmt.setString(1,password);
            stmt.setString(2, id);        
            stmt.executeUpdate();            
            out.print("Datos actualizados ");
            res.sendRedirect(req.getContextPath() + "/");

        }
        catch(Exception e){
            e.printStackTrace();
            System.err.println(e.getMessage());
        } 
    }

	// Sacar los  Datos de la Forma con valores modificados
	
       
	 
	
}