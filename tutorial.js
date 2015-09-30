
	var bootstrapCSSLink = $('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/darkly/bootstrap.min.css">');
	var bootstrapThemeCSSLink = $('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/darkly/bootstrap.min.css">');
	var bootstrapJavaScriptLink = $('<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootlint/0.12.0/bootlint.min.js"></script>');
	
	$('body').append(bootstrapCSSLink);
	$('body').append(bootstrapThemeCSSLink);
	$('body').append(bootstrapJavaScriptLink);	


/*
// ############
//    STEP 1
// ############
*/


$('#linkExplanation').on('click',function(e){
	// Do a GET request on the '/show' URL, with the data payload of the explanation.
	$.get('/show',data={'message': 'This application uses a server that has a database of food. With this application it is possible to retrieve the unhealthy kinds of food from that database.'}, function(data){
		// If successful, add the data to the DOM tree under the 'explanationLink' element.
		$('#explanationLink').html(data);
	});
});


/*
// ############
//    STEP 2
// ############
*/


$('#linkNoReasoning').on('click', function(e){
	
	var query = $('#query1').val();
	var endpoint = 'http://localhost:5820/tutorial/query';
	var format = 'JSON';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktargetNoReasoning').html(ul);
		} catch(err) {
			$('#linktargetNoReasoning').html('Something went wrong!');
		}		
	});
	
});


/*
// ############
//    STEP 3
// ############
*/

		
$('#linkWithReasoning').on('click', function(e){
	
	var query = $('#query2').val();
	var endpoint = 'http://localhost:5820/tutorial/query';
	var format = 'JSON';
	var reasoning = 'true';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': reasoning}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktargetWithReasoning').html(ul);
		} catch(err) {
			$('#linktargetWithReasoning').html('Something went wrong!');
		}
		
	});
	
});
