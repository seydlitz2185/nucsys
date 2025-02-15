import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import mybatis.simple.mapper.ExpressMapper;
import mybatis.simple.model.Express;
import mybatis.simple.model.ExpressOrder;
import mybatis.simple.model.UserLogin;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import mybatis.simple.model.User;
import mybatis.simple.mapper.UserMapper;
import com.alibaba.fastjson2.*;
import java.net.URLDecoder;
import jakarta.servlet.annotation.WebServlet;

@WebServlet(name = "ExpressFetchUserOrderServlet", value = "/ExpressFetchUserOrderServlet")
public class ExpressFetchUserOrderServlet extends HttpServlet{
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*从Request中读取请求*/
        String loginStr = ServletHelper.getRequestPayload(request);
        String pattern = "(json=)";
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(loginStr);
        String result = URLDecoder.decode(m.replaceAll(""),"utf-8");
        JSONObject data = JSON.parseObject(result);
        String userId =data.getString("userId");
        int page=Integer.parseInt(data.getString("offset"));
        response.setContentType("text/html;charset=UTF-8");
        SqlSessionFactory sqlSessionFactory;
        PrintWriter out = response.getWriter();
        Reader reader = Resources.getResourceAsReader("/mybatis/simple/mybatis/mybatis-config.xml");
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        reader.close();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        ExpressMapper expressMapper = sqlSession.getMapper(ExpressMapper.class);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        try {
            List<ExpressOrder> oneExpress = expressMapper.selectByUserOrderId( userId,8*(page-1),8);
            if (oneExpress != null) {
                List<Express> res = new ArrayList<>();
                for (ExpressOrder expressOrder: oneExpress
                ) {
                    User deliver = userMapper.selectById(expressOrder.getDeliverUserId());
                    res.add(new Express(expressOrder.getExpressId(),deliver.getUserName(),expressOrder.getExpressCode(),expressOrder.getDeliverUserId(),expressOrder.getExpressName(),expressOrder.getExpressTime(),expressOrder.getExpressPrice(),deliver.getPhoneNum(),expressOrder.getExpressInfo()));
                }
                String json = JSON.toJSONString(res);
                out.print(json);
            } }finally {
            sqlSession.commit();
            //sqlSession.rollback();
            sqlSession.close();
        }
    }



    /*用Response返回请求*/
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
