/**
 * @author:   Mats Wikmar, mow-github, matwik@gmail.com
 * @description
 * 1. Code which showcases my ability to work with both JS and JQuery without any help from a server technology or DB.
 * 2. The code is used to display a fictive web page about learning javascript.
 * 3. The code uses some random data below (outputs image links and content data).
 * */


$(document).ready(function () {

  /**
   * @description
   * Bootstrap 3 tooltip ( must be activated here.. manually )
   * Used in the footer form
   * */
  $('[data-toggle="tooltip"]').tooltip();


  /**
   * @description
   * Validator object is used to check footer form input data.
   * validates email and textarea against a ValidatorSchema object (see. $("footer form").on("submit",... below )
   * set flags to true or false depending on the format + output a custom error msg under the input field.
   * Opens a bs3 modal with an ok message if no problems were detected.
   * */
  let Validator = {

    /**
     * @description
     * flags:     are false if one finds a error
     * error_msg: are empty if flags are true. custom error msg if false for every input
     * */
    flag_email: false,
    flag_message: false,
    error_msg: {},

    /**
     * @description
     * check the email minLength and that it has at least one character of type X ( based on the ValidatorSchema below ).
     * adds a custom error_msg if one detects an error
     * */
    validateEmail: function(obj){
      if (obj.value.length >= obj.minLength && obj.value.indexOf(obj.checkChar) != -1){
        this.flag_email = true;
        this.error_msg.email = "";
      }else{
        this.error_msg.email = "Se till att e-posten har ett "+obj.checkChar+", samt att den är längre än "+obj.minLength+" tecken";
      }
    },

    /**
     * @description
     * check the message maxLength ( based on the ValidatorSchema below ).
     * adds a custom error_msg if one detects an error
     * */
    validateMessage: function(obj){
      if (obj.value.length <= obj.maxLength) {
        this.flag_message = true;
        this.error_msg.textarea = "";
      }else{
        this.error_msg.textarea = "Meddelanden får ej vara större än "+obj.maxLength+" tecken";
      }
    },

    /**
     * @description
     * set flags to false ( reset validator object )
     * */
    setFlags: function(value){
      this.flag_email = value;
      this.flag_message = value;
    },

    /**
     * @description
     * validate every input field based on the schema.
     * return true if both flags are true.. thus one can run the modal function below (send message ok)
     * */
    validate: function(schema){

      this.validateEmail(schema[0]);
      this.validateMessage(schema[1]);
      $( schema[0].key +"~.alert").text(Validator.error_msg.email);
      $( schema[1].key +"~.alert").text(Validator.error_msg.textarea);

      if( this.flag_email && this.flag_message ){
        this.setFlags(false);
        return true;
      }
    }
  };

  /**
   * @description
   * if one clicks the footer form submit btn.
   * run a validator based on the schema below.. return true if no problem.. and display a ok message in a modal
   * */
  $("footer form").on("submit", function(event){
    event.preventDefault();

    /**
     * @description
     * one can change the schema minLenght, maxLenght or checkChar character. (affects the Validator object output)
     * */
    let email     = "#email";
    let textarea  = "#textarea";
    let ValidatorSchema = [
      {
        key: email,
        value: $(email).val(),
        minLength: 10,
        checkChar: "@"
      },
      {
        key: textarea,
        value: $(textarea).val(),
        maxLength: 255
      }
    ];
    /**
     * @description
     * abort if Validator returns false.. else show a modal with an ok message
     * */
    if( !Validator.validate(ValidatorSchema) ){ return; }
    Resetter.showConfirmModal();
  });

  /**
   * @description
   * Resetter object opens a modal and reset the input fields in the footer form
   * */
  let Resetter = {
    showConfirmModal: function(){
      $("#confirmModal").modal();
      this.resetFooterForm();
    },
    resetFooterForm: function(){
      document.getElementById("footerForm").reset();
    }
  };

  /**
   * @description
   * if one scrolls on the page.. run this function.
   * 1. fadeOut logoImg if one has scrolled more than half the image height.
   * 2. fadeIn logoImg if one has scrolled less than half the image height.
   * */
  $(window).scroll(function(){
    BG.toggleImg( $(this) );
  });

  /**
   * @description
   * if one resize the browser window.
   * 1. fetch the logoImg current height.
   * 2. set it's parent^2 eq. the same height.
   * */
  $(window).resize(function(){
    BG.setParentHeightEqChild();
  });

  /**
   * @description
   * BG aka. background image object modifier for fadeOut or In the logoImg.
   * 1. set logoImg parent^2 location
   * 2. set logoImg location
   * 3. set factor, where one should start to fadeOut the image: etc. 300px * 0,5 = 150px (y-axis scroll)
   * */
  let BG = {
    bg_parent: $("#bg_img1").parent().parent(),
    bg_child: $("#bg_img1"),
    bg_child_factor: .4,

    /**
     * @description
     * read function name (note it is the parent^2)
     * */
    setParentHeightEqChild: function(){
      let height = this.bg_child.height();
      this.bg_parent.height(height+"px");
    },

    /**
     * @description
     * read function name.
     * Note it returns a y-scroll value, based on the current logoImg * factor.
     * A factor of .5 eq half the image height.
     * */
    getHalfChildImgHeight: function(){
      this.setParentHeightEqChild();
      return (this.bg_child.height() * this.bg_child_factor);
    },

    /**
     * @description
     * 1. fadeOut the image if it is more than the returned value (y-scroll).
     * 2. fadeIn the image if it is less than the returend value (y-scroll).
     * */
    toggleImg: function(param1){
      if( param1.scrollTop()> this.getHalfChildImgHeight() ){
        this.bg_child.fadeOut();
      }else{
        this.bg_child.fadeIn();
      }
    }
  };

  /**
   * @description
   * if one clicks the homeBtn in the bottom right corner ( fixed position ).
   * 1. Returns one back to the top of the page ( animate effect )
   * */
  $("#homeBtn").on("click",function(){
    $('html,body').animate({ scrollTop: 0 }, 2000);
  });


  /**
   * @description
   * Parent data links.
   * Used in the Iterator object below
   * */
  let contentObj = [
    { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Vad används JS till" },
    { src: "img/js_bg_green.svg", alt: "img/js_bg_green.svg", text: "Vad är DOM och BOM" },
    { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Variabler" },
    { src: "img/js_bg_green.svg", alt: "img/js_bg_green.svg", text: "Funktioner" },
  ];

  /**
   * @description
   * Child data links.
   * Used in the Iterator object below
   * */
  let contentChildObj = [
    [
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Ge dynamiska sidor", dataHead: "Vad menas med dynamiska sidor", dataText: "JavaScript är ett prototyp-baserat skriptspråk som är dynamiskt, svagt typat och hanterar funktioner som första-klass-objekt. Javascript används främst på klientsidan i webbtillämpningar, det vill säga exekveras i en webbläsares javascript-motor" },
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Validera data", dataHead: "Hur fungerar validering med JS", dataText: "<p>Med validering så syftar man på att t.ex. granska datan som kommer från en användare.</p><p>Eftersom koden körs på klientsidan (din webbläsare) så innebär det även ett ökat hot, då man kan kringgå valideringen innan det skickas upp mot servern.</p><p>I praktiken så kan man t.ex. kommentera bort rader som validerar koden<code>tryck F12 i webbläsaren och kommentera // valfri rad</code></p>"  },
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Ändra Utseende", dataHead: "Utseende", dataText: "<p>Om du har tidigare erfarenhet med CSS så kommer du snart förstå och känns igen dig i hur man manipulerar i DOM</p><p><code>selector.style.display = 'none' (dölja ett object)</code></p><p><code>selector.style.backgroundColor = 'red' (ändra färg på ett object)</code></p>" },
    ],
    [
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "DOM", dataHead: "Genomgång av DOM", dataText: "DOM (Document Object Model) är en trädstruktur över innehållet på din webbsida.<p>I detta kapitel kommer du få öva på att navigera dig till olika noder, med hjälp av olika nyckelord som...</p><p><code>document.getElementById('namn');</code></p><p><code>document.getElementsByClassName('namn');</code></p>" },
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "BOM", dataHead: "Genomgång av BOM", dataText: "BOM (Browser Object Model) består utav ett antal objekt som ärvs från window.<p>I detta kapitel så skall vi bekanta oss med följande objekt.</p><p><code>navigator</code></p><p><code>history</code></p><p><code>screen</code></p><p><code>location</code></p><p><code>document</code></p>" },
    ],
    [
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Variabler", dataHead: "Genomgång av Variabler", dataText: "<p>Variabler används förra att lagra återkommande ord på ett ställe. Lägg följande ord på minnet...</p><p><code>var</code></p><p><code>let </code></p><p><code>const</code></p>" },
    ],
    [
      { src: "img/js_bg.svg", alt: "img/js_bg.svg", text: "Funktioner", dataHead: "Genomgång av Funktioner", dataText: "<p>Då skall vi bekanta oss med funktioner. Du kan se dom som ett verb.. lagaMat, börjaStäda.. Lägg följande uttryck på minnet.. så går vi igenom dom snart.</p><p><code>function(){}</code></p><p><code>function(param1,param2){ return param1 + param2; }</code></p><p><code>(param1,param2){ param1 + param2; }</code></p>" },
    ]
  ];

  /**
   * @description
   * Object with functions so one can iterate the parent or child data, based on the json objects above
   * Note:
   *  contentObj:     eq. parent data
   *  contentChildObj eq. child data
   * */
  let Iterator = {

    /**
     * @description
     * create div part, with the current parent or child image + text + metadata
     *
     *  @param container  eq. where one should add the created content.. see function createContent()
     *  @param key        eq. current iteration nr
     *  @param obj        eq. current "row" in the json object
     * */
    createContent: function(container,key,obj){
      let divOuter = document.createElement("div");
      divOuter.className = "col-xs-12 col-sm-6 col-md-4";
      let divInner = document.createElement("div");
      divInner.className = "content";
        if( container === "contentParent" ){
          divInner.id = key;
        }else{
          divInner.setAttribute("data-head",obj.dataHead);
          divInner.setAttribute("data-text",obj.dataText);
        }
      let img = document.createElement("img");
      img.className = "img-responsive";
      img.src = obj.src;
      img.alt = obj.alt;
      let h3 = document.createElement("h3");
      h3.innerHTML = "Lektion "+(key+1)+" - "+obj.text;
      divInner.appendChild(img);
      divInner.appendChild(h3);
      divOuter.appendChild(divInner);
      document.getElementById(container).appendChild(divOuter);
    },

    /**
     * @description
     * loop link menu based on the length of the json object above
     * Note:
     *  It is used for the parent links AND children links.
     *  The parent links has only one param.. thus it activates the first each loop
     *  The children links has two params.. thus it activates the second each loop
     *
     *  @param container  eq. where one should add the created content.. see function createContent()
     *  @param nr         eq. the id from the clicked parent link
     * */
    loopContent: function(container,nr){
      if( nr === undefined ){
        $.each(contentObj, (key, obj) => {
          this.createContent(container,key,obj);
        });
        this.parentListener();
      }else{
        $.each(contentChildObj[nr], (key, obj) => {
          this.createContent(container,key,obj);
        });
        this.childListener();
      }
    },
    /**
     * @description
     * If one clicks one of the parent links
     * Hide parent links and show children links + update h3
     * */
    parentListener: function(){
      $("#contentParent .content").on("click",function(){
        $("#contentParent").hide("slow");
        Iterator.loopContent("contentChild",$(this).attr("id") );
        $(".separatorContainer").text( $(this).find("h3").text() );
      });
    },
    /**
     * @description
     * If one clicks one of the submenu links.
     * Set specific content and animate to this location
     * */
    childListener: function(){
      $("#contentChild .content").on("click",function(){
        $("#mainContentHead").text( $(this).attr("data-head") );
        $("#mainContentText").html( $(this).attr("data-text") );

        $("#mainContentParent").slideUp("slow",function(){
          $("#mainContentParent").slideDown("slow",function(){
            $('html, body').animate({
              scrollTop: $("#mainContentParent").offset().top
            }, 2000);
          });
        });

      });
    },
    headlineMenu: function(){
      /**
       * @description
       * If one clicks the "innehåll" header.
       * Animate the scrollbar to this location and reset to default content
       * */
      $("#mainContentMenu").on("click",function(event){
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $("#mainContentMenu").offset().top
        }, 2000);
        $("#contentChild").empty();
        $("#contentParent").show("slow");
        $("#mainContentParent").hide("slow");
      });
      /**
       * @description
       * If one clicks the "innehåll" link at the end of the specific mainContent.
       * Run the function above
       * */
      $("#gotomainContentMenu").on("click",function(event){
        event.preventDefault();
        $("#mainContentMenu").trigger("click");
      });
    }
  };
  /**
   * @description
   * Run this after the DOM has finished loading.
   * Loop out "innehåll" content and activate click functionality
   * */
  Iterator.loopContent("contentParent");
  Iterator.headlineMenu();

  /**
   * @description
   * Discussion btn.
   * 1. if one enters a new disskutera message.. clone the first-child and append at the end of the parentContainer
   * 2. Update the last-child text inside the p-tag
   * */
  $("#asideForm").on("submit", function(event) {
    event.preventDefault();
    let tmpClone = $("#asideContainer>div:first-child").clone();
    $("#asideContainer").append( tmpClone );
    $("#asideContainer>div:last-child").find("p").html( $("#d_textarea").val() );
  });

});

