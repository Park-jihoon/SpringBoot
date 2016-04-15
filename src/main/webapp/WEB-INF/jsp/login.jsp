<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/favicon.ico">

    <title>Signin Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="/common/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/common/bootstrap/css/signin.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="/common/bootstrap/assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="/common/bootstrap/assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<div class="container">

    <form class="form-signin" method="post">
        <h2 class="form-signin-heading">BrandLink10</h2>
        <label for="inputID" class="sr-only">아이디</label>
        <input type="text" id="inputID" name="inputID" class="form-control" placeholder="아이디" required autofocus>
        <label for="inputPassword" class="sr-only">비밀번호</label>
        <input type="password" id="inputPassword" name="inputPW" class="form-control" placeholder="비밀번호" required>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> 아이디 저장하기
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">로그인</button>
    </form>

</div> <!-- /container -->


<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="/common/bootstrap/assets/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
