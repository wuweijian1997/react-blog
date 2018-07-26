import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';



let articles =   [{"id":69,"userid":71,"categoryId":null,"title":"qqq修改1","tag":"qqqq#修改","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"xiqqqq","username":"qwer"},{"id":44,"userid":100,"categoryId":null,"title":"Java8 Stream流筛选与切片","tag":"Java8#Stream流#筛选与切片","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"### Java8 Stream流入门之筛选与切片\r\n**Stream的三个操作步骤**\r\n+ 1.创建Stream\r\n+ 2.中间操作\r\n+ 3.终止操作（终端操作）\r\n\r\n#### 一.创建Stream\r\n```\r\n//创建Stream\r\n    @Test\r\n    public void test1() {\r\n\r\n        //1.可以通过Cooection 系列集合提供的stream（）或parallelStream\r\n        //Stream()是串行流，parallelStream是并行流\r\n        List<String> list = new ArrayList<>();\r\n        Stream<String> stream1 = list.stream();\r\n\r\n        //2.通过Arrays中的静态方法stream() 获取数组流\r\n        Employee[] emps = new Employee[10];\r\n        Stream<Employee> stream2 =  Arrays.stream(emps);\r\n\r\n        //3.通过stream类中的静态方法of()\r\n       Stream<String> stream3 = Stream.of(\"a\", \"b\", \"c\");\r\n\r\n       //4.创建无限流\r\n        //迭代\r\n        Stream<Integer> stream4 = Stream.iterate(0, (x) -> x + 2);\r\n        stream4.limit(10).forEach(System.out::println);\r\n```\r\n#### 二.中间操作\r\n+ filter-接收Lambda，过滤，从流中排除某些元素\r\n+ limit-截断流，使其元素不超过给定数量\r\n+ skip(n) 跳过元素，返回一个扔掉了前n个元素的流。与limit互补\r\n+ distinct 筛选，通过流所产生元素的hashCode和equals()去除重复元素\r\n```\r\n @Test\r\n    public  void test1() {\r\n        List<Employee> employees = new ArrayList<>();\r\n        employees.add(new Employee(\"a\",25,5000));\r\n        employees.add(new Employee(\"a\",66,6600));\r\n        employees.add(new Employee(\"c\",265,8000));\r\n        employees.add(new Employee(\"b\",15,300));\r\n        employees.add(new Employee(\"d\",45,2000));\r\n        employees.add(new Employee(\"e\",85,4000));\r\n\r\n        //内部迭代，外部迭代用Iterator迭代器\r\n        employees.stream()\r\n                .filter((e) -> e.getAge() >35)\r\n                .forEach(System.out::println);\r\n\r\n        employees.stream()\r\n                .filter(e->e.getSalary()>4000)\r\n                .limit(3)   //截取前几个\r\n                .forEach(System.out::println);\r\n\r\n        employees.stream()\r\n                .filter(e->e.getSalary()>4000)\r\n                .skip(3)   //跳过前几个，和filter互补\r\n                .forEach(System.out::println);\r\n\r\n        employees.stream()\r\n                .filter(e->e.getSalary()>4000)\r\n                .distinct()   //去重\r\n                .forEach(System.out::println);\r\n    }\r\n```","username":""},{"id":31,"userid":100,"categoryId":null,"title":"MySQL 的用户创建和权限","tag":"MySQL","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"# Mysql用户和用户权限部分操作\r\nMysql新建可远程连接用户\r\n```mysql\r\nCREATE USER 'login_username'@'%' IDENTIFIED BY 'login_password';\r\n```\r\n新建本地连接用户\r\n```mysql\r\nCREATE USER 'login_username'localhost'%' IDENTIFIED BY 'login_password';\r\n```\r\n <!--more-->\r\nMySQL用户授予全部权限\r\n```mysql\r\nGRANT ALL ON *.* TO 'wuweijian'@'%';\r\n```\r\nMySQL用户授予部分表和操作权限\r\nMySQL用户授予部分表和操作权限\r\n(这里是select和insert权限)\r\n```mysql\r\nGRANT SELECT, INSERT ON test.user TO 'you_username'@'%';\r\n```\r\nMySQL更改密码\r\n更改某个用户的密码\r\n```mysql\r\nSET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');\r\n```\r\n更改当前用户密码\r\n```mysql\r\nSET PASSWORD = PASSWORD(\"newpassword\");\r\n```\r\n删除用户\r\n```mysql\r\nDROP USER 'username'@'host'; \r\n```\r\n查询所有用户的用户名和是否能远程连接\r\n```mysql\r\nselect user,host from mysql.user;\r\n```","username":""},{"id":34,"userid":100,"categoryId":null,"title":"markdownn简单语法","tag":"markdown","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"# 一级标题\r\n```\r\n# 一级标题\r\n```\r\n## 二级标题\r\n```\r\n## 二级标题\r\n```\r\n### 三级标题\r\n```\r\n### 三级标题\r\n```\r\n#### 四级标题\r\n```\r\n#### 四级标题\r\n```\r\n##### 五级标题\r\n```\r\n##### 五级标题\r\n```\r\n###### 六级标题\r\n```\r\n###### 六级标题\r\n```\r\n---\r\n# 粗体斜体\r\n\r\n```\r\n*斜体文本*   _斜体文本_\r\n```\r\n*斜体文本*   _斜体文本_\r\n```\r\n**粗体文本** __粗体文本__\r\n```\r\n**粗体文本** __粗体文本__\r\n```\r\n***粗斜体文本***___粗斜体文本___\r\n```\r\n***粗斜体文本***___粗斜体文本___\r\n---\r\n\r\n# 链接\r\n\r\n预览效果\r\n文字形式链接 [我的博客](http://blog.wuweijian.cn)\r\n网址形式链接 <http://blog.wuweijian.cn>\r\n**代码如下**\r\n```\r\n文字形式链接 [我的博客](http://blog.wuweijian.cn)\r\n网址形式链接 <http://blog.wuweijian.cn>\r\n```\r\n\r\n### 高级链接技巧\r\n用网址变量做链接\r\n[Google][1].\r\n[bilibili][bilibili].\r\n[1]: http://www.google.com/\r\n[bilibili]: https://www.bilibili.com/\r\n\r\n**代码如下**\r\n```\r\n[Google][1].\r\n[bilibili][bilibili].\r\n[1]: http://www.google.com/\r\n[bilibili]: https://www.bilibili.com/\r\n```\r\n\r\n---\r\n# 列表\r\n### 普通无序列表\r\n- 列表文本前使用 [减号+空格]\r\n+ 列表文本前使用 [加号+空格]\r\n* 列表文本前使用 [星号+空格]\r\n```\r\n- 列表文本前使用 [减号+空格]\r\n+ 列表文本前使用 [加号+空格]\r\n* 列表文本前使用 [星号+空格]\r\n```\r\n\r\n### 普通有序列表\r\n1. 列表前使用 [数字+空格]\r\n2. 我们会自动帮你添加数字\r\n7. 不用担心数字不对，显示的时候我们会自动把这行的 7 纠正为 3\r\n```\r\n1. 列表前使用 [数字+空格]\r\n2. 我们会自动帮你添加数字\r\n7. 不用担心数字不对，显示的时候我们会自动把这行的 7 纠正为 3\r\n```\r\n---\r\n# 引用\r\n> 引用文本前使用 [大于号+空格]\r\n> 折行可以不加，新起一行都要加上哦\r\n\r\n**代码如下**\r\n```\r\n> 引用文本前使用 [大于号+空格]\r\n> 折行可以不加，新起一行都要加上哦\r\n```\r\n---\r\n\r\n# 图片\r\n![leno](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2444417686,1560113072&fm=58)\r\n**代码如下**\r\n```\r\n![leno](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2444417686,1560113072&fm=58)\r\n```\r\n\r\n# 分隔符\r\n---\r\n```\r\n---\r\n```\r\n\r\n---\r\n# 表格\r\n| 参数           | 说明                 |   默认值            |\r\n| ------------- |:-------------------:|:------------------:|\r\n| host          | 远程主机的地址         |                    |\r\n| user          | 使用者名称            |                    |\r\n| root          |  远程主机的根目录      |                    |\r\n| port          | 端口                 |       22           |\r\n| delete        | 删除远程主机上的旧文件   |  true              |\r\n| verbose       | 显示调试信息           |   true             |\r\n| ignore_errors | 忽略错误              |     false          |\r\n\r\n__代码如下__\r\n```\r\n| 参数           | 说明                 |   默认值            |\r\n| ------------- |:-------------------:|:------------------:|\r\n| host          | 远程主机的地址         |                    |\r\n| user          | 使用者名称            |                    |\r\n| root          |  远程主机的根目录      |                    |\r\n| port          | 端口                 |       22           |\r\n| delete        | 删除远程主机上的旧文件   |  true              |\r\n| verbose       | 显示调试信息           |   true             |\r\n| ignore_errors | 忽略错误              |     false          |\r\n```","username":""},{"id":47,"userid":100,"categoryId":null,"title":"Java Stream流终止操作","tag":"Java8#Stream流#查找#匹配","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"### Java8 Stream流查找和匹配\r\n+ allMatch-检察是否匹配所有元素\r\n+ anyMatch-检查是否至少包含一个元素\r\n+ noneMatch-检查是否没有匹配所有元素\r\n+ findFirst-返回当前流中的任意元素\r\n+ findAny-返回当前流中的任意元素\r\n+ count-返回流中元素的总个数\r\n+ max-返回流中的最大值\r\n+ min- 返回流中的最小值\r\n\r\n```\r\n  List<Employee> employees = Arrays.asList(new Employee(\"a\",25,5000)\r\n            ,new Employee(\"e\",85,4000)\r\n            ,new Employee(\"d\",45,2000)\r\n            ,new Employee(\"b\",15,300)\r\n            ,new Employee(\"c\",265,8000)\r\n            ,new Employee(\"a\",66,6600)\r\n            );\r\n```\r\n+ allMatch-检察是否匹配所有元素\r\n```\r\n boolean flag = employees.stream()\r\n                .allMatch((e) -> e.getAge() > 10);//检查是否所有匹配\r\n```\r\n+ anyMatch-检查是否至少包含一个元素\r\n```\r\nflag = employees.stream()\r\n                .anyMatch(e -> e.getSalary() < 5000);//检查 是否有一个匹配\r\n```\r\n+ noneMatch-检查是否没有匹配所有元素\r\n```\r\n        System.out.println(flag);\r\n        flag = employees.stream()\r\n                .noneMatch(e -> e.getSalary() < 5000);//检查是否全部不匹配\r\n```\r\n+ findFirst-返回当前流中的任意元素\r\n```\r\n  Optional<Employee> op2 = employees.stream()\r\n                .filter(e -> e.getSalary()>4000)\r\n                .findAny();\r\n        System.out.println(op2.get());\r\n```\r\n+ count-返回流中元素的总个数\r\n```\r\n long count = employees.stream()\r\n                .count();\r\n```\r\n+ max-返回流中的最大值\r\n```\r\n   op = employees.stream()\r\n                .max((e1, e2)->Double.compare(e1.getSalary(), e2.getSalary()));\r\n        System.out.println(op.get());\r\n```\r\n+ min- 返回流中的最小值\r\n```\r\n  op = employees.stream()\r\n                .min((e1, e2)->Double.compare(e1.getSalary(), e2.getSalary()));\r\n        System.out.println(op.get() );\r\n```","username":""},{"id":46,"userid":100,"categoryId":null,"title":"Java8 Stream流中间操作","tag":"映射#排序","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"### Java8 Stream流 映射、排序\r\n**映射**\r\n + map-接收Lambda，将元素转换成其他形式或提取信息。接收一个函数\r\n作为参数，该函数会被应用到每一个元素，并将其映射成一个新的元素\r\n\r\n+ flatMap - 接收一个函数作为参数，将流中的每个值都换成一个流，然后把所有流连成一个流\r\n```\r\n@Test\r\n    public void test5() {\r\n\r\n        List<String> list = Arrays.asList(\"aaa\", \"bbb\", \"ccc\");\r\n        list.stream()\r\n                .map(str -> str.toUpperCase())\r\n                .forEach(System.out::println);\r\n\r\n        list.stream()\r\n                .flatMap(TestStreamAPI2::filterCharacter)\r\n                .forEach(System.out::println);\r\nemployees.stream()\r\n                 .map(Employee::getName)\r\n                 .forEach(System.out::println);\r\n    }\r\n```\r\n###排序\r\n+ sorted()-自然排序\r\n+ sorted(Comparator com) -- 定制排序\r\n```\r\n //自然排序\r\n        List<String> list = Arrays.asList(\"daa\", \"bbb\", \"ccc\");\r\n        list.stream()\r\n                .sorted()\r\n                .forEach(System.out::println);\r\n```\r\n定制排序\r\n```\r\nList<Employee> employees = new ArrayList<>();\r\n        employees.add(new Employee(\"a\",25,5000));\r\n        employees.add(new Employee(\"a\",66,6600));\r\n        employees.add(new Employee(\"c\",265,8000));\r\n        employees.add(new Employee(\"b\",15,300));\r\n        employees.add(new Employee(\"d\",45,2000));\r\n        employees.add(new Employee(\"e\",85,4000));\r\n         employees.stream()\r\n                .sorted((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary())\r\n                ).forEach(System.out::println);\r\n```","username":""},{"id":29,"userid":100,"categoryId":null,"title":"HTML5 LocalStorage本地存储和sessionStorage使用","tag":"json,前端,html5","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"# HTML5的 LocalStorage本地存储和sessionStorage使用\r\n由于最近学到了前后端分离，想着用html+Ajax+ssm写个博客，没想到越写越麻烦，由于html不能获取servlet里\"域\"的值，\r\n所以刚开始每个数据都是从后台重新获取的，然而这样效率极低，听说还有Recat，码者由于期末时间受限，\r\n不愿再学新的东西所以暂时用 LocalStorage和sessionStorage代替之。如果你有兴趣不妨抽时间去学习学习。\r\nsessionStorage和localStorage就一个地方不同，sessionStorage数据的存储仅限在会话中，\r\n也就是说数据只保存到浏览器关闭，当浏览器重新打开这个页面是，之前的数据以被清除。\r\nlocalstorage是一个持久化的存储，并不局限于会话，浏览器关闭后重新打开里面的数据还是存在的\r\n代码奉上\r\n```\r\nvar localStorage = window.localStorage;\r\nvar sessionStorage = window.localStorage;\r\n\r\nsessionStorage.getItem(key):获取指定key本地存储的值\r\nsessionStorage.setItem(key,value)：将value存储到key字段\r\nsessionStorage.removeItem(key):删除指定key本地存储的值\r\nsessionStorage.length是sessionStorage的项目数\r\n\r\nlocalStorage.getItem(key):获取指定key本地存储的值\r\nlocalStorage.setItem(key,value)：将value存储到key字段\r\nlocalStorage.removeItem(key):删除指定key本地存储的值\r\nlocalStorage.length是sessionStorage的项目数\r\n```\r\n遍历所有的键\r\n```\r\nfor (var i = 0; i < localStorage.length; i++) {\r\n    console.log(localStorage.key(i));\r\n}\r\n```\r\n存Json\r\n```\r\n    var obj = { Hellow:'world' }; \r\n    var str = JSON.stringify(obj); //将对象转成json\r\n //存入 \r\n    sessionStorage.obj = str; \r\n    //读取 \r\n    str = sessionStorage.obj; \r\n    //重新转换为对象 \r\n    obj = JSON.parse(str);//将json转成对象\r\n```","username":""},{"id":30,"userid":100,"categoryId":null,"title":"MySQL的数据表操作1.0","tag":"Mysql","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"# MySQL的一些表操作\r\n这是MySQL的表里的一些操作，并不是很齐，都是今年学的一些东西，如果有需要可以查询一波\r\n\r\n查看表\r\n```\r\nshow tables;\r\n```\r\n创建表\r\n```\r\ncreate table t_bookType(\r\nid int primary key auto_increment,\r\nbookTypeName varchar(20),\r\nbookTypeDesc varchar(200)\r\n);\r\n```\r\n插入数据\r\n```\r\ninsert into 学生成绩(学号,姓名,性别,出生日期,年龄,语文,数学,英语,总分) value(90,'山下智久','男','2020-9-20',27,94,94,84,数学+语文+英语);\r\n```\r\n删除表中的一条数据\r\n```\r\ndelete from table where 字段='删除的值';\r\n```\r\n删除表中的所有数据\r\n```\r\ndelete from tableName;\r\n```\r\n修改表名\r\n```\r\nalter table 原表名 rename 修改后表名;\r\n```\r\n修改列名\r\n```\r\nalter table 表名 change bookName bookName2 varchar(30); \r\n```\r\n修改列数据\r\n```\r\nupdate 表名\r\nset 列名='新数据'\r\nwhere 列名='原数据';\r\n```\r\n增加列\r\n```\r\nalter table t_book add testField int after author;//插在某一列后\r\nalter table 学生 add 第一列 int first;//插在第一列\r\n```\r\n删除列\r\n```\r\nalter table 表名 drop 列名;\r\n```\r\n删除表\r\n```\r\ndrop table 表名;\r\n```\r\n修改字段类型\r\n```\r\nalter table 表名 modify column 字段 类型;\r\n```\r\n复制表(带数据)\r\n```\r\ncreate table new_table select * from old_table;\r\n```\r\n交换字段位置\r\n```\r\nupdate table_name as a, table_name as b set a.oneLine=b.twoLine, a.twoLine=b.oneLine where a.主键=b.逐渐;\r\nupdate student_info as a, student_info as b set a.院系=b.性别, a.性别=b.院系 where a.编号=b.编号;\r\n```\r\n调整字段顺序\r\n```\r\n alter table 表名 change 字段名 新字段名 字段类型 默认值 after 字段名(跳到哪个字段之后)\r\nalter table table_name change old_field new_field type after field;\r\n```\r\n\r\n多主键创建表\r\n```\r\nCREATE TABLE tb_emp3\r\n(\r\n    \r\nname       VARCHAR(25),\r\n    \r\ndeptId      INT(11),\r\n    \r\nsalary        FLOAT,\r\n    \r\nPRIMARY KEY(name,deptId)\r\n);\r\n```\r\n外键创建\r\n```\r\nCREATE TABLE tb_dept1\r\n(    \r\nid              INT(11) PRIMARY KEY,\r\n    \r\nname       VARCHAR(22)  NOT NULL,\r\n    \r\nlocation   VARCHAR(50),\r\n);\r\n\r\n\r\nCREATE TABLE tb_emp4\r\n(\r\n    \r\nid             INT(11) PRIMARY KEY,\r\n    \r\nname       VARCHAR(25),\r\n    \r\ndeptId      INT(11),\r\n    \r\nsalary        FLOAT,\r\n \r\nCONSTRAINT fk_emp_dept1 FOREIGN KEY (deptId)\r\nREFERENCES tb_dept(id)\r\n);\r\n```\r\n默认约束语句\r\n```\r\nCREATE TABLE tb_emp1\r\n(\r\n\r\n    id             INT(11) PRIMARY KEY,\r\n\r\n    name       VARCHAR(25),\r\n\r\n    deptId      INT(11) DEFAULT 1001，\r\n\r\n    salary        FLOAT,\r\n);\r\n```\r\n\r\n唯一约束语句\r\n```\r\nCREATE TABLE tb_emp1\r\n(\r\n\r\n    id             INT(11) PRIMARY KEY,\r\n\r\n    name       VARCHAR(25),\r\n\r\n    deptId      INT(11) UNIQUE,\r\n\r\n    salary        FLOAT\r\n);\r\n```\r\n\r\n选项约束，只能为男或女\r\n```\r\nalter table Student add constraint sex check(Sex='男' or Sex='女');\r\n```\r\n条件约束，值大于0\r\n```\r\nalter table Course add constraint ck_ch check (ClassHour >0);\r\n```","username":""},{"id":32,"userid":100,"categoryId":null,"title":"Ubuntu服务器配置JDK环境变量","tag":"Ubuntu,JDK","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"# 仅用于Ubuntu服务器配置jdk\r\n__提醒：如果安装文件夹和我的不一样注意修改路径__\r\n我的下载文件夹：usr/local/java\r\n你可以\r\n```\r\ncd /usr/local\r\nmkdir java\r\ncd java \r\n```\r\n进入文件。\r\n## 1.下载JDK\r\n```\r\nwget --no-check-certificate --no-cookies --header \"Cookie: oraclelicense=accept-securebackup-cookie\" http://download.oracle.com/otn-pub/java/jdk/8u65-b17/jdk-8u65-linux-x64.tar.gz\r\n```\r\nps:后面的连接自己更改，到Oracle官网选择要下载的jdk版本（注意是Linux，我这个是tar.gz类型的），右键要下载的链接，复制链接地址\r\n## 2.解压安装\r\n```\r\ntar zxvf jdk-7u60-linux-x64.tar.gz\r\n```\r\nps:后面的jdk压缩包用自己文件下的文件名就可以了\r\n## 3.重命名\r\n```\r\nmv jdk1.7.0_60 java7\r\n```\r\nps:前面是你的jdk文件名，重命名后后面配置环境变量时会容易点\r\n## 4.配置环境变量\r\n```\r\nvi ~/.bashrc\r\n```\r\n在最后加上\r\n```\r\nexport JAVA_HOME=/usr/java/java7\r\nexport JRE_HOME=${JAVA_HOME}/jre\r\nexport CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib\r\nexport PATH=${JAVA_HOME}/bin:$PATH\r\n```\r\nps:路径或jdk版本不同注意修改路径\r\n\r\n## 5.刷新测试\r\n```\r\n刷新\r\nsource ~/.bashrc\r\n\r\n测试\r\njava -version\r\n```\r\n如果出现jdk版本则说明安装成功\r\n\r\n最后：最近测试发现安装jdk9.0安装tomcat运行会出问题，貌似由于jdk文件里没有jre文件夹。","username":""},{"id":33,"userid":100,"categoryId":null,"title":"GitHub上传文件和一些简单命令","tag":"Github","status":0,"blogPic":null,"commentQuantity":null,"likeQuantity":null,"readingQuantity":null,"publishTime":null,"content":"## GitHub简单的上传项目 | 文件到GitHub仓库\r\n```\r\ngit init\r\ngit add .\r\ngit commit -m \"备注\"\r\ngit remote add origin https://github.com/wuweijian1997/game.git\r\ngit pull origin master\r\ngit push -u origin master\r\n```\r\n首先到GitHub网站新建一个仓库，复制仓库的网址链接样例如下(也可以复制仓库链接末尾加.git)\r\n```\r\nhttps://github.com/wuweijian1997/game.git\r\n```\r\n cd 到你要上传的文件夹下\r\n新建一个.git文件夹\r\n```\r\ngit init\r\n```\r\n添加全部文件到本地仓库\r\n```\r\ngit add .\r\n```\r\n提交\r\n```\r\ngit commit -m \"备注\"\r\n```\r\n远程连接GitHub仓库（网址是你自己的GitHub仓库链接）\r\n```\r\ngit remote add origin https://github.com/wuweijian1997/game.git\r\n```\r\n推之前可以先拉一下仓库，否则仓库里已有README.md文件会报错\r\n```\r\ngit pull origin master\r\n```\r\n推到远程仓库\r\n```\r\ngit push -u origin master\r\n```\r\n如果报错可能是你新建仓库时添加了README.md文件,那你先gii pull一下再git push\r\n```\r\ngit pull \r\ngit push -u origin master\r\n```\r\n从GitHub仓库将文件拉到本地master分支\r\n```\r\ngit pull origin master\r\n```\r\n---\r\n分支命令\r\n创建分支\r\n```\r\ngit branch \"分支名称\"\r\n```\r\n查看分支\r\n```\r\ngit branch\r\n```\r\n查看远程分支\r\n```\r\ngit branch -r\r\n```\r\n切换分支\r\n```\r\ngit checkout \"分支名称\"\r\n```\r\n将分支推送到远程仓库\r\n```\r\ngit push origin HEAD -u\r\n```\r\n---\r\n获取仓库的副本（仓库里的文件）\r\n\r\n```\r\ngit clone \"仓库地址\"\r\n```\r\n如果不是同一个文件夹上传文件或文件夹已有其他文件时可执行以下命令然后git push\r\n```\r\ngit pull origin master --allow-unrelated-histories\r\n```\r\nps:如果上面git链接时报错可删除链接最后的.git","username":""}]

let length = 1000;

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'POST /api/articles/add':(req, res) => {
    let article = {};
    article.title = req.body.title;
    article.content = req.body.content;
    article.id = ++length;
    articles.push(article)
    res.send({ message: articles });
  },
  'POST /api/articles/latest': 'http://b.wuweijian.cn',
  'POST /api/articles/get': {
    "status": 0,
    "msg": null,
    "data": {
      "id": 44,
      "userid": 100,
      "categoryId": null,
      "title": "Java8 Stream流筛选与切片",
      "tag": "Java8#Stream流#筛选与切片",
      "status": 0,
      "blogPic": null,
      "commentQuantity": null,
      "likeQuantity": null,
      "readingQuantity": null,
      "publishTime": null,
      "content": "content"
    },
  },
  'POST /api/articles/update':(req, res) => {
    let id = req.body.id;
    articles.forEach((article) =>{
        if (article.id == id) {
          article.title = req.body.title;
          article.content = req.body.content;
          res.send(article);
          return;
        }
    })
  },
  'POST /api/articles/delete':(req, res) => {
    let id = req.body.id;
    articles.forEach((article, index) =>{
      if (article.id == id) {
        articles.splice(index, 1);
        res.send(articles);
        return;
      }
    })
  }
};

 // export default (noProxy ? {} : delay(proxy, 1000));
export default {
  'POST /api/(.*)': 'http://b.wuweijian.cn/api/',
};
