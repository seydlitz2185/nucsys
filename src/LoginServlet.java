import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import mybatis.simple.model.UserLogin;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import mybatis.simple.model.User;
import mybatis.simple.mapper.UserMapper;
import com.alibaba.fastjson2.*;
import java.net.URLDecoder;

/**
 * @author stevenyu
 */
@WebServlet(name = "login", value = "/LoginServlet")
public class LoginServlet  extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*从Request中读取请求*/

        String loginStr = ServletHelper.getRequestPayload(request);
        String pattern = "(json=)";
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(loginStr);
        String result = URLDecoder.decode(m.replaceAll(""),"utf-8");
        JSONObject data = JSON.parseObject(result);
        result = data.getString("UserLogin");
        data = JSON.parseObject(result);
        String account=data.getString("account");
        String passwd=data.getString("passwd");

        /*用Response返回请求*/
        response.setContentType("text/html;charset=UTF-8");
        SqlSessionFactory sqlSessionFactory;
        PrintWriter out = response.getWriter();
        try{
            Reader reader = Resources.getResourceAsReader("/mybatis/simple/mybatis/mybatis-config.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
            reader.close();
            SqlSession sqlSession = sqlSessionFactory.openSession();
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            try{
                User user = userMapper.selectById(account);
                if(user.getPassword().equals(passwd)){
                    UserLogin success = new UserLogin();
                    success.setMsg("登陆成功");
                    success.setAccount(user.getId());
                    success.setName(user.getUserName());
                    success.setPhoneNum(user.getPhoneNum());
                    String json = JSON.toJSONString(success);
                    out.print(json);
                }else{
                    UserLogin unsuccess = new UserLogin();
                    unsuccess.setMsg("登陆失败");
                    String json = JSON.toJSONString(unsuccess);
                    out.print(json);
                }
            } finally {
                sqlSession.close();
            }
        }catch (IOException ignore) {
            ignore.printStackTrace();
        }


    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}

