jQuery(document).ready(function($) {
  // loading
  setTimeout(() => {
    $(".loadingsc").fadeOut("slow");
    $("#top").add('show')
  }, 4000);
  if ($(".loadingsc").length) {
    new Vivus('move', {
      type: 'oneByOne',
      duration: 100,
      forceRender: false,
      animTimingFunction: Vivus.EASE_OUT,
      start: 'autostart'
    });
    setTimeout(() => {
      new Vivus('move2', {
        type: 'oneByOne',
        duration: 100,
        forceRender: false,
        animTimingFunction: Vivus.EASE_OUT,
        start: 'autostart'
      });
    }, 1000);
    setTimeout(() => {
      new Vivus('move3', {
        type: 'oneByOne',
        duration: 100,
        forceRender: false,
        animTimingFunction: Vivus.EASE_OUT,
        start: 'autostart'
      });
    }, 1500);
    setTimeout(() => {
      new Vivus('move4', {
        type: 'oneByOne',
        duration: 100,
        forceRender: false,
        animTimingFunction: Vivus.EASE_OUT,
        start: 'autostart'
      });
    }, 2000);
  }

  // menu sp
  $(".js-hamburger").click(function(event) {
    $(this).toggleClass('open');
    $(".js-navi_sp").toggleClass('is-show');
  });
  // header scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 80) {
      $('.sub .header').addClass('scroll');
    } else {
      $('.sub .header').removeClass('scroll');
    }
  });

  // load html
  var num = 1;
  $(".current").addClass('relative show');
  $(".innerload").each(function(index, el) {
    var innerload = $(this).attr('id');
    if (innerload == 'top') {
      $(this).load("/index.html .inner")
    }
    $(this).load("/" + innerload + "/index.html .inner", function() {
      // menu sp
      $("#" + innerload + " .js-hamburger").click(function(event) {
        $(this).toggleClass('open');
        $("#" + innerload + " .js-navi_sp").toggleClass('is-show');
      });

      $(".current").nextAll(".slidepage").removeClass('prev').addClass('next');
      $(".current").prevAll(".slidepage").removeClass('next').addClass('prev');

      $(".js-link").click(function(event) {
        $(".header").addClass('absolute');
        $(".js-navi_sp").removeClass('is-show');
        $(".js-hamburger").removeClass('open');
        $(".slidepage").removeClass('show');
        $(".slidepage").removeClass('relative');
        $("" + $(this).attr('href') + "").addClass('show');
        // $(".js-link").removeClass('current');
        // $(".js-link").attr('href', "" + $(this).attr('href') + "").addClass('current');
        // if ($(this).attr('href') == "#top") {
        //   $("body").removeClass('sub').addClass('main');
        // } else {
        //   $("body").removeClass('main').addClass('sub');
        // }
        // $(".current").hide();
        setTimeout(() => {
          // $(".header").removeClass('absolute');
          $("" + $(this).attr('href') + "").addClass('relative');
        }, 100);
        setTimeout(() => {
          $(".header").removeClass('absolute');
        }, 500);
        $(".slidepage.show").nextAll(".slidepage").removeClass('prev').addClass('next');
        $(".slidepage.show").prevAll(".slidepage").removeClass('next').addClass('prev');
      });
    });
    // num++;
    // $(this).css('z-index', num);
  });

  // form contact
  var request;
  $("body").on("click", ".form form button.next-button", function() {
    let check_field = true;
    let name = $("form input[name=name]").val();
    let name_company = $("form input[name=name_company]").val();
    let email = $("form input[name=email]").val();
    let content = $("form textarea[name=content]").val();

    if (name == "") {
      $("form input[name=name]").addClass("error").removeClass("success");
      check_field = false;
    } else {
      $("form input[name=name]").removeClass("error").addClass("success");
    }

    if (email == "") {
      $("form input[name=email]").addClass("error").removeClass("success");
      check_field = false;
    } else {
      $("form input[name=email]").removeClass("error").addClass("success");
    }

    if (content == "") {
      $("form textarea[name=content]").addClass("error").removeClass("success");
      check_field = false;
    } else {
      $("form textarea[name=content]").removeClass("error").addClass("success");
    }

    $("form input[name=name_company]").addClass("success");

    if (check_field == false) {
      return false;
    }
    $("form input").css('display', 'none');
    $("form textarea").css('display', 'none');
    $("form .input-name").text(name).css('display', 'block');
    $("form .input-name-company").text(name_company).css('display', 'block');
    $("form .input-email").text(email).css('display', 'block');
    $("form .input-content").text(content).css('display', 'block');
    setTimeout(function() {
      $("form button.next-button").prop("type", "submit").html("送信<span>></span>");
      $("form button.back-button").show();
    }, 100);
    return;
  })
  $("body").on("click", ".form form button.back-button", function(e) {
    $("form input").css('display', 'block');
    $("form textarea").css('display', 'block');
    $("form .input-name").css('display', 'none');
    $("form .input-name-company").css('display', 'none');
    $("form .input-phone").css('display', 'none');
    $("form .input-email").css('display', 'none');
    $("form .input-content").css('display', 'none');
    $("form button.next-button").prop("type", "button").html("確認<span>></span>");
    $("form button.back-button").hide();
  })
  $("body").on("submit", ".form form", function(e) {
    e.preventDefault();
    if (request) {
      request.abort();
    }
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");
    var serializedData = $form.serialize();
    $inputs.prop("disabled", true);
    $form.addClass("loading");
    request = $.ajax({
      url: "/mail.php",
      dataType: 'json',
      type: "post",
      data: serializedData
    });

    // request.done(function(response, textStatus, jqXHR) {
    //   console.log(response);
    //   if (response.check == true) {
    //     $form.append('<div class="alert alert-primary" style="margin-top:20px;font-size:16px;padding: 10px;line-height:21px;">' + response.message + '</div>');
    //     $form.trigger("reset");
    //   } else {
    //     $form.append('<div class="alert alert-danger" style="margin-top:20px;font-size:16px;padding: 10px;line-height:21px;">' + response.message + '</div>');
    //   }
    // });
    // request.fail(function(jqXHR, textStatus, errorThrown) {
    //   alert("Error");
    // });
    request.always(function() {
      $inputs.prop("disabled", false);
      $form.removeClass("loading");
      $form.append('<div class="alert alert-primary" style="margin-top:20px;font-size:16px;padding: 10px;line-height:21px;">お問い合わせありがとうございます。<br>担当者より折り返しご連絡させて頂きますので今しばらくお待ち下さい。</div>');
    });
  })
});
