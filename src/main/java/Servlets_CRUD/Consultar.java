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

public class Consultar extends HttpServlet 
{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("text/xml;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

        //En el caso de que se quiera consultar un usuario en específico
        String idParameter = "";
        if(request.getParameter("id") != null){
            idParameter = request.getParameter("id");
        }
        
        try
        {
            ConexionBD db = new ConexionBD();
            
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection(db.url, db.user, db.password);
            
            //Creamos el query
            String query = "";
            
            if(idParameter != "")
                query = "SELECT * FROM DatosUsuario WHERE id = " + idParameter ;
            else
                query = "SELECT * FROM DatosUsuario" ;
            
            //Creamos el java statement
            Statement st = conn.createStatement();        
            
            //Ejecutamos el query
            ResultSet rs = st.executeQuery(query);
            
            //Iterar el resultado
            out.append("<usuarios>");
                    
            while (rs.next())
            {
                out.append("<usuario>");
                String id = rs.getString("id");
                String nombre = rs.getString("nombre");
                String apPaterno = rs.getString("apPaterno");
                String apMaterno = rs.getString("apMaterno");
                    
                out.append("<id>").append(id).append("</id>");
                out.append("<nombre>").append(nombre).append("</nombre>");
                out.append("<apPaterno>").append(apPaterno).append("</apPaterno>");
                out.append("<apMaterno>").append(apMaterno).append("</apMaterno>");
                
                out.append("</usuario>");
            }
            st.close();
            out.append("</usuarios>");

        }
        catch(Exception e){
            e.printStackTrace();
            System.err.println(e.getMessage());
        } 
    }

}
