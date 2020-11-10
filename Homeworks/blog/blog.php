<?php

class Blog {
    // Properties
    private     $host       =   "localhost";
    private     $user       =   "root";
    private     $password   =   "";

    private     $conn;
    public      $conn_status    =   false;
    
    // Constructor
    function __construct(){
        $this->connect();
    }

    // Methods
    private function connect() {
        $this->conn         =   mysqli_connect($this->host, $this->user, $this->password, "blog");
        $this->conn_status  =   $this->conn->connect_error ? false : true;
    }

    public function check_connection()
    {
        return $this->conn_status;
    }

    public function get_blogs() 
    {
        # code...
        $blogs = array();
        $sql = $this->conn->query("select * from blogs");
        
        while ($row = mysqli_fetch_array($sql)){
            $blogs[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'content' => $row['content'],
                'created_at' => $row['created_at'],
            ];
        }
        
        return $blogs;
    }

    public function get_blog($id)
    {
        # code...
        $sqlRequest = "select * from blogs where id=$id;";
        $sql = $this->conn->query($sqlRequest);
        while ($row = mysqli_fetch_array($sql)){
            $blogs[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'content' => $row['content'],
                'created_at' => $row['created_at'],
            ];
        }
        
        return $blogs;
    }

    public function new_blog()
    {
        # code...
        $data = $_POST;
        $sqlRequest = "insert into blogs(title, description, content) values('${data['title']}', '${data['description']}', '${data['content']}');";
        $sql = $this->conn->query($sqlRequest);

        return $sql;
    }

    public function update_blog($id)
    {
        # code...
        $data = $_POST;
        $titleHas = $data['title'] != "-";
        $descriptHas = $data['description'] != "-";
        $contentHas = $data['content'] != "-";
        
        $title = $titleHas ? "title = '${data['title']}'" : "";
        $description = $descriptHas ? (($titleHas)?",": "")."description = '${data['description']}'":"";
        $content = ($contentHas)?(($titleHas || $descriptHas)?",":"")."content = '${data['content']}'" : "";

        $sqlRequest = "update blogs set $title $description $content where id=$id;";
        $sql = $this->conn->query($sqlRequest);
        
        return $sql;
    }

    public function delete_blog($id)
    {
        # code...
        $sqlRequest = "delete from blogs where id=$id;";
        $sql = $this->conn->query($sqlRequest);
        
        return $sql;
    }
}

if(isset($_POST["mode"])){
    $blog = new Blog();
    $status = $blog->check_connection();
    $mode = $_POST["mode"];
    $data = [];

    if ($status) {
        switch ($_POST["mode"]) {
            case 'getallblogs':
                # code...
                $data = $blog->get_blogs();
                break;
            case 'newblog':
                # code...
                $data = $blog->new_blog();
                break;
            case 'getblog':
                # code...
                $data = $blog->get_blog($_POST["id"]);
                break;
            case 'updateblog':
                # code...
                $data = $blog->update_blog($_POST["id"]);
                break;
            case 'deleteblog':
                # code...
                $data = $blog->delete_blog($_POST["id"]);
                break;
            default:
                $status = false;
                $mode = 'Undefined';
                break;
        }
    }

    echo json_encode([
        'status' => $status,
        'mode' => $mode,
        'data' => $data
    ]);
}
?>