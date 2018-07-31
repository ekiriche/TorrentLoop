<!doctype html>
<html lang="{{ app()->getLocale() }}">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Hypertube</title>
		<link  rel="icon" type="image/png" sizes="16x16" href="https://s15.postimg.cc/j68tnwgy3/movie-clapper-open.png">
		<!-- Fonts -->
		<link href="https://fonts.googleapis.com/css?family=Nunito:400,700" rel="stylesheet">
		<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
	</head>
	<body>
		<div id="root"></div>
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
		<!-- Import jQuery before materialize.js -->
	  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
	  <!-- And then your bundled js -->
		<script src="js/app.js"></script>
	</body>
</html>
