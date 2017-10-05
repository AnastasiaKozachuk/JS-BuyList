$(function() {
    var $list = $("#first_column");
    var $left = $("#left");
    var $bought =$("#have_bought");
    function add_el(name){
        if(name.trim() !== ""){
            var visible = true;
            var quantity = 1;
            var $node = $("<div  class=\"in_box\" >\n" +
            "                   <div class=\"prod_lf\" >\n" +
            "                   <div class=\"col_f_prod\" id=\"name_prod\">\n" +
            "  "+  name + "\n" +
            "                   </div>\n" +
            "<input class=\"col_f_prod \" id = \"new_name\" style=\"display: none\">"+
            "                   </div>\n" +
            "                   <div class=\"prod_lf\"  >\n" +
            "                       <form class=\"form_s \">\n" +
            "                           <button id = \"minus\"type=\"button\" class=\"but_col_f button_col_s\" data-tooltip=\"Tooltip\" >&#10134;</button>\n" +
            "                           <span id = \"number\"class=\"span_f\">"+  quantity + "</span>\n" +
            "                           <button id = \"plus\"type=\"button\" class=\"but_col_s button_col_s\" data-tooltip=\"Tooltip\">&#10133;</button>\n" +
            "                       </form>\n" +
            "                   </div>\n" +
            "                   <div class=\"prod_lf\" >\n" +
            "                       <form class=\"form_t\">\n" +
            "                   <button style=\"display: none\" id = \"no_bought\"type=\"button\" class=\"but_buy\" data-tooltip=\"Tooltip\" >Не куплено</button>\n" +
            "                           <button id = \"bought\"type=\"button\" class=\"but_buy\" data-tooltip=\"Tooltip\" >Куплено</button>\n" +
            "                           <button id = \"remove\"type=\"button\" class=\"but_remove\" data-tooltip=\"Tooltip\">&#10060;</button>\n" +
            "                       </form>\n" +
            "                   </div>\n" +
            "\n" +
            "               </div>" );

            var $right_el = $("  <span class=\"span_s\">\n" +
                "                      <span class='line_name'>"+  name +" </span>\n" +
                "                      <span id =\"amount\" class=\"span_amount\">"+  quantity + "</span>\n" +
                "                  </span>");
            var $bought_el = $("  <span class=\"span_s\">\n" +
                "                      <span class='line_name'>"+  name +" </span>\n" +
                "                      <span id =\"amount\" class=\"span_amount\">"+  quantity + "</span>\n" +
                "                  </span>");

             $("#first_column").css("height",parseInt($("#first_column").css("height"))+65);
             $(".main_col").css("height",parseInt($(".main_col").css("height"))+65);

             $node.find("#remove").click(function(){


                     $right_el.remove();
                     $node.remove();
                 set_radius($list.find("div.in_box").last());
                  $("#first_column").css("height",parseInt($("#first_column").css("height"))-65);
                  $(".main_col").css("height",parseInt($(".main_col").css("height"))-65);
               });


            if(quantity===1){
                $node.find("#minus").css("background-color","#ee9e9e");
                $node.find("#minus").css("box-shadow","0px 2px 0px 2px #ee9e9e");
                $node.find("#minus").prop("disabled", true);
            }
            $node.find("#plus").click(function(){
                quantity+=1;
                $node.find("#number").text(quantity);
                $right_el.find("#amount").text(quantity);
                if(quantity>1){
                    $node.find("#minus").css("background-color","#db2828");
                    $node.find("#minus").css("box-shadow","0px 2px 0px 2px #bf2728");
                    $node.find("#minus").prop("disabled", false);
                }else{

                }
            });

            $node.find("#minus").click(function(){
                if(quantity>1){
                    quantity-=1;
                    $node.find("#number").text(quantity);
                    $right_el.find("#amount").text(quantity);
                    if(quantity===1){
                        $node.find("#minus").css("background-color","#ee9e9e");
                        $node.find("#minus").css("box-shadow","0px 2px 0px 2px #ee9e9e");
                        $node.find("#minus").prop("disabled", true);
                    }
                }

            });


            $node.find("#name_prod").click(function(){
                if(visible) {
                    $node.find("#name_prod").hide();
                    $node.find("#new_name").show();
                    $node.find("#new_name").val(name);
                    $node.find("#new_name").focus();
                }
            });
            $node.find("#new_name").focusout(function () {
                $node.find("#name_prod").show();
                $node.find("#new_name").hide();
                name =  $node.find("#new_name").val();
                $node.find("#name_prod").text(name);


            });


            $node.find("#bought").click(function(){
                $node.find("#bought").hide();
                $node.find("#remove").hide();
                $node.find("#minus").hide();
                $node.find("#plus").hide();
                $node.find("#no_bought").show();
                $node.find("#name_prod").css("text-decoration","line-through");
                $right_el.hide();
                $bought_el.find("#amount").text(quantity);
                $bought_el.show();
                visible=false;
            });

            $node.find("#no_bought").click(function(){
                $node.find("#no_bought").hide();
                $node.find("#minus").show();
                $node.find("#plus").show();
                $node.find("#bought").show();
                $node.find("#remove").show();
                $node.find("#name_prod").css("text-decoration","none");
                $bought_el.hide();
                $right_el.show();
                visible = true;
            });
            del_radius($list.find("div.in_box").last());

            set_radius($node);
             $bought.append($bought_el);
             $bought_el.hide();
            $bought_el.find(".line_name").css("text-decoration","line-through");
            $bought_el.find("#amount").css("text-decoration","line-through");
             $left.append($right_el);
             $list.append($node);
        }
    };


    function del_radius(element){
        element.css("border-bottom-left-radius","0px");
        element.css("border-bottom-right-radius","0px");
    };
    function set_radius(element){
        element.css("border-bottom-left-radius","10px");
        element.css("border-bottom-right-radius","10px");
    };

        add_el("Помідори");
        add_el("Печиво");
        add_el("Сир");

    var $new_item = $(".text_area");

    $("#add_but").click(function(){
       var $name = $new_item.val();
        $new_item.val("");
        add_el($name);
        $(".text_area").focus();
    });

    $(".text_area").keydown(function(){
        if(event.keyCode == 13) {
            event.preventDefault();
            var $name = $new_item.val();
            $new_item.val("");
            add_el($name);
        }
    });
});