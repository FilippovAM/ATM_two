$(document).ready(function () {
		
		// Global Variables
        window_w = $(window).width();
        window_h = $(window).height();
        window_s = $(window).scrollTop();

        $html = $('html');
        $body = $('body');

        if(history.pushState)
            var ionic_current_path = location.pathname;

        // Window Load and Resize
        $(window).bind('resize load', function () {

            window_w = $(window).width();
            window_h = $(window).height();
            window_s = $(window).scrollTop();

        });

        // Window Scroll
        $(window).scroll(function () {

            window_s = $(window).scrollTop();

        });
		
		enableLabelauty();
		enableSortTable();
		enableAccordions();
		enablePostLike();
		enableSearchBox();
		enablePrettyPhoto();
		enableWOWAnimate();
		enablelayerSlider();
		enableTooltips();
		enableTextareaResize();
		enableBackToTop();
		enableSetEqualHeight();




});
		  
	function enableAccordions() {

        $('.accordions').each(function () {

            // Set First Accordion As Active
            $(this).find('.accordion-content').hide();

            if ($(this).find('.accordion:first-child').hasClass('accordion-active')) {
                $(this).find('.accordion:first-child .accordion-content').show();
            }

            // Set Accordion Events
            $(this).find('.accordion-header').click(function () {

                if (!$(this).parent().hasClass('accordion-active')) {

                    // Close other accordions
                    $(this).parent().parent().find('.accordion-active').removeClass('accordion-active').find('.accordion-content').slideUp(300);

                    // Open Accordion
                    $(this).parent().addClass('accordion-active');
                    $(this).parent().find('.accordion-content').slideDown(300);

                } else {

                    // Close Accordion
                    $(this).parent().removeClass('accordion-active');
                    $(this).parent().find('.accordion-content').slideUp(300);

                }

            });

        });
    };
	
	function enableTooltips() {
		 $("[data-toggle='tooltip']").tooltip();
	};
	
	

	function enableTextareaResize() {
	        $('textarea').autoResize({
                    animateDuration: 300,
                    extraSpace: 0
                }
        );
	};
	

	
	
	
	function enablePostLike(){
		$('.project-like').click(function () {

        $post_id = $(this).attr('data-post');

        //end if clicked or cookie exists
        if ($('.post-liked', this).length > 0 || document.cookie.indexOf('saved_post_like_' + $post_id) != -1) {
            return;
        }

        $('.like-count', this).animate({opacity: 0}, 200, function () {
            $(this).html(parseInt($(this).html()) + 1);
            $(this).animate({opacity: 1}, 200);
        });

        $(this).addClass('post-liked');

        $current_post_like = $('.like-count', this);

        $.ajax({
            type: 'GET',
            url: ajaxurl,
            data: {
                action: 'save_post_like',
                post_id: $post_id
            },
            success: function (data, textStatus, XMLHttpRequest) {
                $($current_post_like).html(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
	
	};
	
	
	
	
	 function enableSearchBox() {

        $('.search_box a').click(function () {
            $('.search_box').toggleClass('search_box_opened');
        });

        $(document).click(function (e) {
            if (!$('.search_box a, .search_box *').is(e.target)) {
                $('.search_box').removeClass('search_box_opened');
            }
        });

    };
	
	
	
	
	function enablePrettyPhoto(){
			if (typeof $.fn.prettyPhoto == 'function') {
			$("a[rel^='prettyPhoto']").prettyPhoto();
		}
    }
		
		
	function enableWOWAnimate(){	
		wow = new WOW(
            {
                boxClass:     'wow',      // default
                animateClass: 'animated', // default
                offset:       150,          // default
                mobile:       true,       // default
                live:         true        // default
            }
		)
		wow.init();
	};
			
			
	function enablelayerSlider(){
			 
			$('#layerslider').layerSlider({
            responsive: true,
            autoStart: true,
            responsiveUnder: 1110,
            layersContainer: 1280,
            skinsPath: 'img/layerslider/skins/',
            skin: 'v5',
            navStartStop: false,
            navButtons: false,
			twoWaySlideshow: true,
			keybNav: true
			 });
	};
	
	function enableBackToTop(){
		
		$(window).scroll(function(){
        var offset = $(document).height() - window_h - 500;
        if($('.footer').length)
            offset = $('.footer').offset().top - window_h;

        if(window_s > offset && window_w > 767){
            $('.back-to-top').fadeIn(400);
        }else{
            $('.back-to-top').fadeOut(400);
        }
    });

    $('.back-to-top').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('#anchor-landmark').offset().top }, 1000);
        e.preventDefault();
    });

	};
	
	function enableSetEqualHeight(){
		var tallestcolumn = 0;
		var columns = $(".what-sets-container .what-sets-column");
		columns.each(
		function()
		{
			currentHeight = $(this).height();
			if(currentHeight > tallestcolumn)
			{
				tallestcolumn = currentHeight;
			}
		}
		);
		columns.height(tallestcolumn);
    };
	
	
	


	




	

	
	function enableSortTable() {
	
		var img_dir = "img/table_sort_icons/";// папка с картинками
		var sort_case_sensitive = false; // вид сортировки (регистрозависимый или нет)

    // ф-ция, определяющая алгоритм сортировки
    function _sort(a, b) {
        var a = a[0];
        var b = b[0];
        var _a = (a + '').replace(/,/, '.');
        var _b = (b + '').replace(/,/, '.');
        if (parseFloat(_a) && parseFloat(_b)) return sort_numbers(parseFloat(_a), parseFloat(_b));
        else if (!sort_case_sensitive) return sort_insensitive(a, b);
        else return sort_sensitive(a, b);
    }

    // ф-ция сортировки чисел
    function sort_numbers(a, b) {
        return a - b;
    }

    // ф-ция регистронезависимой сортировки
    function sort_insensitive(a, b) {
        var anew = a.toLowerCase();
        var bnew = b.toLowerCase();
        if (anew < bnew) return -1;
        if (anew > bnew) return 1;
        return 0;
    }

    // ф-ция регистрозависимой сортировки
    function sort_sensitive(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    // вспомогательная ф-ция, выдирающая из дочерних узлов весь текст
    function getConcatenedTextContent(node) {
        var _result = "";
        if (node == null) {
            return _result;
        }
        var childrens = node.childNodes;
        var i = 0;
        while (i < childrens.length) {
            var child = childrens.item(i);
            switch (child.nodeType) {
                case 1: // ELEMENT_NODE
                case 5: // ENTITY_REFERENCE_NODE
                    _result += getConcatenedTextContent(child);
                    break;
                case 3: // TEXT_NODE
                case 2: // ATTRIBUTE_NODE
                case 4: // CDATA_SECTION_NODE
                    _result += child.nodeValue;
                    break;
                case 6: // ENTITY_NODE
                case 7: // PROCESSING_INSTRUCTION_NODE
                case 8: // COMMENT_NODE
                case 9: // DOCUMENT_NODE
                case 10: // DOCUMENT_TYPE_NODE
                case 11: // DOCUMENT_FRAGMENT_NODE
                case 12: // NOTATION_NODE
                    // skip
                    break;
            }
            i++;
        }
        return _result;
    }

    // суть скрипта
    function sort(e) {
        var el = window.event ? window.event.srcElement : e.currentTarget;
        while (el.tagName.toLowerCase() != "td") el = el.parentNode;
        var a = new Array();
        var name = el.lastChild.nodeValue;
        var dad = el.parentNode;
        var table = dad.parentNode.parentNode;
        var up = table.up;
        var node, arrow, curcol;
        for (var i = 0; (node = dad.getElementsByTagName("td").item(i)); i++) {
            if (node.lastChild.nodeValue == name){
                curcol = i;
                if (node.className == "curcol"){
                    arrow = node.firstChild;
                    table.up = Number(!up);
                }else{
                    node.className = "curcol";
                    arrow = node.insertBefore(document.createElement("img"),node.firstChild);
                    table.up = 0;
                }
                arrow.src = img_dir + table.up + ".gif";
                arrow.alt = "";
            }else{
                if (node.className == "curcol"){
                    node.className = "";
                    if (node.firstChild) node.removeChild(node.firstChild);
                }
            }
        }
        var tbody = table.getElementsByClassName("table_sort_tbody").item(0);
        for (var i = 0; (node = tbody.getElementsByTagName("tr").item(i)); i++) {
            a[i] = new Array();
            a[i][0] = getConcatenedTextContent(node.getElementsByTagName("td").item(curcol));
            a[i][1] = getConcatenedTextContent(node.getElementsByTagName("td").item(1));
            a[i][2] = getConcatenedTextContent(node.getElementsByTagName("td").item(0));
            a[i][3] = node;
        }
        a.sort(_sort);
        if (table.up) a.reverse();
        for (var i = 0; i < a.length; i++) {
            tbody.appendChild(a[i][3]);
        }
    }

    // ф-ция инициализации всего процесса
    function init(e) {
        if (!document.getElementsByTagName) return;

        for (var j = 0; (thead = document.getElementsByClassName("table_sort_thead").item(j)); j++) {
            var node;
            for (var i = 0; (node = thead.getElementsByTagName("td").item(i)); i++) {
                if (node.addEventListener) node.addEventListener("click", sort, false);
                else if (node.attachEvent) node.attachEvent("onclick", sort);
                node.title = "Нажмите на заголовок, чтобы отсортировать колонку";
            }
            thead.parentNode.up = 0;

            if (typeof(initial_sort_id) != "undefined"){
                td_for_event = thead.getElementsByTagName("td").item(initial_sort_id);
                if (document.createEvent){
                    var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click", false, false, window, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, td_for_event);
                    td_for_event.dispatchEvent(evt);
                } else if (td_for_event.fireEvent) td_for_event.fireEvent("onclick");
                if (typeof(initial_sort_up) != "undefined" && initial_sort_up){
                    if (td_for_event.dispatchEvent) td_for_event.dispatchEvent(evt);
                    else if (td_for_event.fireEvent) td_for_event.fireEvent("onclick");
                }
            }
        }
    }
	
	
	    var root = window.addEventListener || window.attachEvent ? window : document.addEventListener ? document : null;
    if (root){
        if (root.addEventListener) root.addEventListener("load", init, false);
        else if (root.attachEvent) root.attachEvent("onload", init);
    }
	

	
	    $('.members_info_container .member_home_table tbody td:last-child').each(function(){

            initial_sort_id = 0;

        if ($(this).html()[0].indexOf('-') != -1)

        {
            $(this).toggleClass('negative-value');
        }
        else
        {
            $(this).toggleClass('positive-value');
        }

        });

	}

function enableLabelauty() {
    $(":checkbox, :radio").labelauty({
        label: false
    });
};


	
	

	
	

	    
		
		