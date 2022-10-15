<script setup>
    defineProps({
      msg: {
        type: String,
        required: true
      }
    })
    </script>
    
    <template>
    <n-card>
    <table id="simple">
        <td class="search">
        <form action="select" method="post">
        账号：<input type="text" name="account">
        <br/><br/>
        <input type="submit" value="查询">
        </form>
        </td>
    </table>
  </n-card>
    </template>
    
    <style scoped>
    #simple{
        border: 2px solid;
    }
    .header{
        border: 1px solid;
     
        text-align: center;

    }
    .insert,.search{
        border: 1px solid;
        
        vertical-align: top;
    }
    h1 {
      font-weight: 500;
      font-size: 2.6rem;
      top: -10px;
    }
    
    h3 {
      font-size: 1.2rem;
    }
    
    .greetings h1,
    .greetings h3 {
      text-align: center;
    }
    
    @media (min-width: 1024px) {
      .greetings h1,
      .greetings h3 {
        text-align: left;
      }
    }
    </style>
    