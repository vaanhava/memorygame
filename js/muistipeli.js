var kortit=new Array();
var ekaKortti = '';
var vaikeustaso = 1;
var arvauksia = 0;
var pareja = 0;
var maxParit = 6;

// Korttien sekoitus / Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Korttien luonti aloita-painikkeella
$(document).ready(function()
{

	$(".easy").click(function () {
		$(".easy").css('background', '#04AA6D');
		$(".easy").css('color', 'white');
		$(".medium").css('background', 'white');
		$(".medium").css('color', 'black');
		$(".medium").css('border', '2px solid #008CBA');
		$(".hard").css('background', 'white');
		$(".hard").css('color', 'black');
		$(".hard").css('border', '2px solid #f44336');

		vaikeustaso = 1;
		maxParit = 6;
		
	});
	$(".medium").click(function () {
		$(".medium").css('background', '#008CBA');
		$(".medium").css('color', 'white');
		$(".easy").css('background', 'white');
		$(".easy").css('color', 'black');
		$(".easy").css('border', '2px solid #04AA6D');
		$(".hard").css('background', 'white');
		$(".hard").css('color', 'black');
		$(".hard").css('border', '2px solid #f44336');

		vaikeustaso = 2;
		maxParit = 9;
		
	});
	$(".hard").click(function () {
		$(".hard").css('background', '#f44336');
		$(".hard").css('color', 'white');
		$(".easy").css('background', 'white');
		$(".easy").css('color', 'black');
		$(".easy").css('border', '2px solid #04AA6D');
		$(".medium").css('background', 'white');
		$(".medium").css('color', 'black');
		$(".medium").css('border', '2px solid #008CBA');

		vaikeustaso = 3;
		maxParit = 12;
	});

	$('#aloita').click(function(e)
	{
		$(".hiddable").css('display', 'inline-block');
		pareja = 0;
		arvauksia = 0;
		ekaKortti='';
		$('#arvauksia').text(arvauksia);
		$('#pelialue').empty();

		if (vaikeustaso == 1) {
			var kortit = new Array('sininen', 'sininen', 'punainen', 'punainen', 'vihrea', 'vihrea', 'oranssi', 'oranssi', 'violetti', 'violetti', 'ruskea', 'ruskea');
		}
		if (vaikeustaso == 2) {
			var kortit = new Array('sininen', 'sininen', 'punainen', 'punainen', 'vihrea', 'vihrea', 'oranssi', 'oranssi', 'violetti', 'violetti', 'ruskea', 'ruskea', 'keltainen', 'keltainen', 'turkoosi', 'turkoosi', 'musta', 'musta');
		}
		if (vaikeustaso == 3) {
			var kortit = new Array('sininen', 'sininen', 'punainen', 'punainen', 'vihrea', 'vihrea', 'oranssi', 'oranssi', 'violetti', 'violetti', 'ruskea', 'ruskea', 'keltainen', 'keltainen', 'turkoosi', 'turkoosi', 'musta', 'musta', 'pinkki', 'pinkki', 'harmaa', 'harmaa', 'oliivi', 'oliivi');
		}

		kortit = shuffle(kortit);
		$.each(kortit,function(key,value)
		{
			$('#pelialue').append("<div id='" + key + "' class='" + value + 
			" kortti' style='background-image: url(img/tausta.png)';></div>")
		});		
	});
});

function win() {
	alert("You win!");
}


// Korttien sisällön tarkastaminen
$('#sisalto').delegate('.kortti','click',function() 
{
	if ($(this).attr('style')!==undefined) 
	{
		$(this).removeAttr('style');
		if (ekaKortti==='')
		{
			ekaKortti=$(this).attr('id');
		}
		else {
			if ($(this).attr('id')!==ekaKortti) 
			{
				$('#arvauksia').text(++arvauksia);
				if ($(this).hasClass($('#' + ekaKortti).attr('class'))) 
				{
					ekaKortti='';
					pareja++;

					if (pareja == maxParit) {
						$(this).removeAttr('style');
						setTimeout(win, 400);
					}
				}
				else {
					$(this).animate(
					{
						backgroundImage: 'url(img/tausta.png)'
					},400,function() 
					{
						$('#' + ekaKortti).css('background-image','url(img/tausta.png)');
						$(this).css('background-image','url(img/tausta.png)');
						ekaKortti='';
						
					});
				}

			}
		}
	}
});