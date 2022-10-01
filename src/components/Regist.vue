<script setup>
    defineProps({
      msg: {
        type: String,
        required: true
      }
    })
    </script>
    
    <template>
    <table id="simple">
    <tr>
        <td class="insert">
    <form action="add" method="post">
        账号：<input type="text" name="account"><br/><br/>
        密码：<input type="text" name="passwd"><br/><br/>
            <input type="submit" value="注册">
            <br/><br/>
    </form>
            </td>
    </tr>
</table>
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
    

  
    </style>
    