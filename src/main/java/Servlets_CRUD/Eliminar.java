package Servlets_CRUD;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Eliminar extends HttpServlet 
{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        
        String id = req.getParameter("id");
        
        try
        {
            ConexionBD db = new ConexionBD();
            
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(db.url, db.user, db.password);
            Statement st = conn.createStatement();
            String query;
            
            //Creamos el query
            query = "DELETE FROM Usuario WHERE id = '"+id+"';";
            st.executeUpdate(query);            
            
            query = "DELETE FROM DatosUsuario WHERE id = '"+id+"';";
            st.executeUpdate(query);
            
            res.sendRedirect(req.getContextPath() + "/");

        }
        catch(Exception e){
            e.printStackTrace();
            System.err.println(e.getMessage());
        } 
    }

}

