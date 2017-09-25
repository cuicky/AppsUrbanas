angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function(){
    $rootScope.loggedUser={
      email:null,
      username:null
    }
    $state.go("login")
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CotizadorCtrl', function($rootScope,$scope, $stateParams,$http,$httpParamSerializerJQLike,$ionicSlideBoxDelegate,$cordovaDialogs) {

  $scope.disableSwipe = function() {
   $ionicSlideBoxDelegate.enableSlide(false);
};

$scope.slideTo = function(index) {
  $ionicSlideBoxDelegate.slide(index);
};

$scope.preguntar = false;
$scope.preguntas = function(){
  $scope.preguntar=true;
}
  $scope.options = {
  loop: false,
  effect: 'slide',
  speed: 500,
}

$scope.producto = {
  articulo:"",
  costo:"",
  caracteristica:""
}

$scope.current = 0;

$scope.productos = []

$scope.agregar = function(p){
  $scope.productos.push(p)
  console.log($scope.productos)
  $scope.producto = {
    articulo:"",
    costo:"",
    caracteristica:""
  }
  $scope.slideTo(0)
}

$scope.derecha = function(){
  if($scope.current ==0 ){
    $scope.current=$scope.productos.length-1;
    return
  }
  $scope.current--;
}

$scope.izquierda = function(){
  if($scope.current >= $scope.productos.length-1){
    $scope.current=0;
    return
  }
  $scope.current++;
}


$scope.remove = function(p){
  $scope.productos = _.without($scope.productos,p)
}

$scope.mandar = function(pd){
  $scope.enviado=null;
  $scope.mandando = true;
  var obj = {
    "your-email":$rootScope.loggedUser.email,
    "your-name":$rootScope.loggedUser.username,
    "your-subject":"Mensaje from app",
    "your-message":"Mensaje from app",
    "enteraste":"Mobile application",
    "articulo":_.pluck(pd,"articulo"),
    "costo":_.pluck(pd,"costo"),
    "caracteristica":_.pluck(pd,"caracteristica")
  }

  var promise = $http({
    url:"https://www.acegroupinc.net/wp-content/themes/cardinal/emailPdf.php",
    method: 'POST',
    data: $httpParamSerializerJQLike(obj), // Make sure to inject the service you choose to the controller
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
    }
  })

  promise.then(function(res){

    $cordovaDialogs.alert('Brevemente recibirás tu cotización por email', 'Cotización enviada', 'OK')
    .then(function() {
      // callback success
      $scope.mandando=null;
      // $scope.enviado = "Brevemente recibirás tu cotización por email"
      $scope.productos=[]
    });

  },function(err){
    console.error(err)
  })
}

$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
  // data.slider is the instance of Swiper
  $scope.slider = data.slider;
});

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.slider.activeIndex;
  $scope.previousIndex = data.slider.previousIndex;
});
})

.controller('NoticiasCtrl', function($scope, $stateParams,$http) {
  var promise = $http({
    method:"GET",
    url:"https://www.acegroupinc.net/wp-json/wp/v2/posts"
  })

  promise.then(function(response){
    $scope.noticias = response.data;
    console.log($scope.noticias);
  },function(error){})
})

.controller('DetalleNoticiaCtrl', function($scope, $stateParams,$http) {
  console.log($stateParams)
  var promise = $http({
    method:"GET",
    url:"https://www.acegroupinc.net/wp-json/wp/v2/posts/"+$stateParams.idNoticia
  })

  promise.then(function(response){
    $scope.noticia = response.data;
  },function(error){})
})

.controller('PlaylistsCtrl', function($scope,$state,$rootScope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.logout = function(){
    $rootScope.loggedUser={
      email:null,
      username:null
    }
    $state.go("login")
  }
})

.controller('LoginCtrl', function($scope,$http,$rootScope,$state) {
  $scope.user = {
    username:"",
    password:"",
    email:""
  }

  $scope.accion = "login"

  $scope.login = function(){
    $scope.errorLogin=null;
    $scope.registrando = true;
    var promise = $http({
      method:"GET",
      url:"https://www.acegroupinc.net/api/get_nonce/?controller=user&method=generate_auth_cookie"
    })

    promise.then(function(resp){
      var obj = {
        username:$scope.user.username,
        password:$scope.user.password,
        nonce:resp.data.nonce
      }


      var promise2 = $http({
        method:"GET",
        url:"https://www.acegroupinc.net/api/user/generate_auth_cookie/",
        params:obj
      })

      promise2.then(function(respu){
        if(respu.data.error){
          $scope.user.username = "";
          $scope.user.password="";
          $scope.errorLogin = respu.data.error;
          $scope.registrando = null;
          return
        }

        $rootScope.loggedUser={
          email:respu.data.user.email,
          username:respu.data.user.nicename
        }
        $scope.registrando=null;
        $scope.user.username = "";
        $scope.user.password="";
        $scope.user.email="";
        $scope.registrando = null;
        $scope.errorLogin=null
        $state.go("app.playlists")
      },function(error){
        alert(error)
      })


    },function(error){})
  }


  $scope.accion = "login"

  $scope.create = function(){
    $scope.errorLogin=null;
    $scope.registrando = true;
    var promise = $http({
      method:"GET",
      url:"https://www.acegroupinc.net/api/get_nonce/?controller=user&method=register"
    })

    promise.then(function(resp){
      var obj = {
        username:$scope.user.username,
        user_pass:$scope.user.password,
        email:$scope.user.email,
        display_name:$scope.user.username,
        nonce:resp.data.nonce
      }


      var promise2 = $http({
        method:"GET",
        url:"https://www.acegroupinc.net/api/user/register/?notify=no",
        params:obj
      })

      promise2.then(function(respu){
        if(respu.data.error){
          $scope.user.username = "";
          $scope.user.password="";
          $scope.user.email="";
          $scope.errorLogin = respu.data.error;
          $scope.registrando = null;
          return
        }
        $scope.login()
        // $scope.user.username = "";
        // $scope.user.password="";
        // $scope.user.email="";
        // $scope.registrando = null;
        // $scope.errorLogin=null
          // $scope.loginSuccess ="Cuenta creada satisfactoriamente, espere a que el administrador apruebe"

      },function(error){
        alert(error)
      })


    },function(error){})
  }



})

.controller('MapCtrl', function($scope, $state,$compile,$timeout) {

  var vm = this;
  var latLng = new google.maps.LatLng(32.55192, -116.947444);

  $scope.displayMap = true;
    $scope.$on('$ionicView.beforeLeave', function(){
        $scope.displayMap = false;
    });

  var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };



    $timeout(function(){
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Wait until the map is loaded
    // google.maps.event.addListenerOnce($scope.map, 'idle', function(){
    //
    //   var marker = new google.maps.Marker({
    //       map: $scope.map,
    //       animation: google.maps.Animation.BOUNCE,
    //       position: latLng
    //   });

    // });
  },100)










  // function initialize() {
  //       var myLatlng = new google.maps.LatLng(32.55192,-116.947444);
  //
  //       var mapOptions = {
  //         center: myLatlng,
  //         zoom: 16,
  //         mapTypeId: google.maps.MapTypeId.ROADMAP
  //       };
  //       var map = new google.maps.Map(document.getElementById("map"),
  //           mapOptions);
  //
  //       //Marker + infowindow + angularjs compiled ng-click
  //       var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
  //       var compiled = $compile(contentString)($scope);
  //
  //       var infowindow = new google.maps.InfoWindow({
  //         content: compiled[0]
  //       });
  //
  //       var marker = new google.maps.Marker({
  //         position: myLatlng,
  //         map: map,
  //         title: 'Uluru (Ayers Rock)'
  //       });
  //
  //       google.maps.event.addListener(marker, 'click', function() {
  //         infowindow.open(map,marker);
  //       });
  //
  //       $scope.map = map;
  //     }
  //
  //
  //
  //     google.maps.event.addDomListener(window, 'load', initialize);
  //     initialize()
  // vm.initMap("foo")

})

.controller('ContactoCtrl', function($rootScope,$scope,$state, $stateParams,$http,$httpParamSerializerJQLike) {
  $scope.mensaje = {
    asunto:"",
    mensaje:""
  }

  $scope.showMap = function(){
    $state.go('app.map', {}, {reload: true});
  }

  $scope.mandar = function(msg){

    $scope.mandando=true;
    var obj = {
      "your-email":$rootScope.loggedUser.email,
      "your-name":$rootScope.loggedUser.username,
      "asunto":msg.asunto,
      "mensaje":msg.mensaje,
    }

    var promise = $http({
      url:"https://www.acegroupinc.net/wp-content/themes/cardinal/contactoApp.php",
      method: 'POST',
      data: $httpParamSerializerJQLike(obj), // Make sure to inject the service you choose to the controller
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
      }
    })

    promise.then(function(res){
      $scope.mandando=null;
      $scope.enviado = "Tu mensaje se ha enviado"
      $scope.mensaje = {
        asunto:"",
        mensaje:""
      }

    },function(err){
      console.error(err)
    })

  }
})

.controller('PedidosVerificadosCtrl', function($scope, $stateParams,$state,$http,$rootScope) {
  var promise = $http({
    url:"https://www.acegroupinc.net/customer-orders",
    method: 'GET',
    params:{
      email:$rootScope.loggedUser.email
    }
  })

  promise.then(function(res){
    var data = _.map(res.data,function(elem){
      elem.date.format = moment(elem.date.date).format("DD/MM/YYYY")
      return elem
    })
    $scope.orders = data

  },function(err){
    console.error(err)
  })
})

.controller('PlaylistCtrl', function($scope, $stateParams,$state) {

});
