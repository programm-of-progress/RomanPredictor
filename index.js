var fs = require("fs");
var http = require('http');
const { json } = require('micro');
module.exports = async req => {
	const { request, session, version } = await json(req);

	try {
		fileContent = fs.readFileSync(session.user_id + '.txt', "utf8");
		var player = fileContent.split(' + ');
	} catch (err) {
        fs.writeFileSync(session.user_id + '.txt', "0 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0");
		fileContent = "0 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0"
		var player = fileContent.split(' + ');
    };
// player[0] = шаг
// player[1] = 
// player[2] = имя пользователя
// player[3] = 
// player[4] = имя
// player[5] = животное
// player[6] = предмет
// player[7] = действие
// player[8] = прилагательное
// player[9] = прилагательное_2
// player[10] = сообщение
// player[11] = имя для сообщения
// player[12] = номер прочитанного сообщения
// player[13] = 
	
	if (session.new == true){
		player[0] = 1
		fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
			if (err) throw err;
		});
		return {
			version,
			session,
			response: {
				text: 'Здравствуй! Я романтический оракул. Я могу рассказать тебе твоё будущее. А могу передать кому-нибудь твоё романтическое послание. Чтобы узнать подробнее - скажи ПОМОЩЬ.\n Ну что, начнём?',
				card: {
					type: "BigImage",
					image_id: "1652229/e6e2267eebdffd972e9d",
					title: "Романтический оракул",
					description: "Здравствуй! Я романтический оракул. Я могу рассказать тебе твоё будущее. А могу передать кому-нибудь твоё романтическое послание. Чтобы узнать подробнее - скажи ПОМОЩЬ. Ну что, начнём?",
				},
				buttons: [
					{
						title: "да",
						hide: true,
					},
					{
						title: "нет",
						hide: true,
					},
				],
				end_session: false,
			},
		}
	}else if(request.command == "помощь"){
		player[0] = 1
		fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
			if (err) throw err;
		});
		return {
			version,
			session,
			response: {
				text: 'Для того, чтобы получить романтическое предсказание, необходимо ответить на несколько вопросов. \n  Можно записать на чьё-то имя романтическое послание и когда человек с этим именем сюда зайдет, то он сможет прослушать это послание. \n А можно прослушать романтические послания, если кто-то записал их на твоё имя. \n Ну что, начнём?',
				buttons: [
					{
						title: "да",
						hide: true,
					},
					{
						title: "нет",
						hide: true,
					},
				],
				end_session: false,
			},
		}		
/* 	}else if(request.command == "начать сначала"){
		fs.writeFile(session.user_id + '.txt', "1 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0", (err) => {
			if (err) throw err;
		});
		return {
			version,
			session,
			response: {
				text: 'Привет! Хочешь узнать романтическое предсказание? Для этого ты должен ответить на несколько вопросов. Готов?',
				buttons: [
					{
						title: "да",
						hide: true,
					},
					{
						title: "нет",
						hide: true,
					},
				],
				end_session: false,
			},
		}		 */
	}else if (player[0] == 0){//шаг 0
		if (request.command == "закончить"){
			return {
				version,
				session,
				response: {
					text: 'Жаль. Но если захочешь узнать ещё одно романтическое предсказание - зови, расскажу. До свидания! До новых встреч!',
					end_session: true,
				}
			}
		} else if ((request.command == "ещё")||(request.command == "еще")){
			player[0] = 1
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			return {
				version,
				session,
				response: {
					text: 'Хорошо! Готов отвечать на вопросы?',
				buttons: [
					{
						title: "да",
						hide: true,
					},
					{
						title: "нет",
						hide: true,
					},
				],
					end_session: true,
				}
			}
		} else {
			return {
				version,
				session,
				response: {
					text: 'Не понятно, закончить или ещё?',
				buttons: [
					{
						title: "ещё",
						hide: true,
					},
					{
						title: "закончить",
						hide: true,
					},
				],
					end_session: false,
				}
			}
		}
	} else if (player[0] == 1){ //шаг 1
		if  (request.command == "да"){
			player[0] = 2
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			return {
				version,
				session,
				response: {
					text: 'Как тебя зовут?',
					end_session: false,
				}
			}
		} else if (request.command == "нет"){
			return {
				version,
				session,
				response: {
					text: 'Ну и зря. Но если передумаешь, ты знаешь, где меня искать.',
					end_session: true,
				}
			}
		} else {
			return {
				version,
				session,
				response: {
					text: 'Не понятно. Продолжаем?',
				buttons: [
					{
						title: "да",
						hide: true,
					},
					{
						title: "нет",
						hide: true,
					},
				],
					end_session: false,
				}
			}
		}
	} else if ((player[0] == 2)||(request.command == "главное меню")||(request.command == "отмена")){ //шаг 2
//		var newName = getName(request.command);//узнаём пол пользователя
		
		if (player[0] == 2){
			player[2] = request.command //имя пользователя
		}
		player[0] = 3
		fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
			if (err) throw err;
		});
		toText = player[2] + ', Что выбираешь? Узнать предсказание, записать послание или послушать сообщения?';
		return {
			version,
			session,
			response: {
				text: toText,
				card: {
					type: "ItemsList",
					header: {
						text: player[2] + ", Что выбираешь?",
					},
					items: [
						{
							image_id: "1652229/8c6b71f92fd3cf192a60",
							title: "Узнать предсказание", //player[0] = 100
							description: "Узнать предсказание",
 							 button: {
								 text: "Узнать предсказание",
								// url: "",
								// payload: {}
							 }
						},
						{
							image_id: "1030494/cd0f8fe52ba8755829c6",
							title: "Записать послание", //player[0] = 200
							description: "Записать послание",
 							// button: {
								// text: "Записать послание",
								// url: "",
								// payload: {}
							// }
						},
						{
						image_id: "1652229/773d1d7dff3a9d6a9f68",
							title: "Послушать сообщения", //player[0] = 300
							description: "Послушать сообщения",
 							// button: {
								// text: "Послушать сообщения",
								// url: "",
								// payload: {}
							// }
						},
					],
					footer: {
						text: "Текст блока под изображением.",
						button: {
							text: "Надпись на кнопке",
//							url: "https://example.com/",
//							payload: {} 
						}
					}
				},
				buttons: [
					{
						title: "узнать предсказание",
						hide: true,
					},
					{
						title: "записать послание",
						hide: true,
					},
					{
						title: "послушать сообщения",
						hide: true,
					},
				],
				end_session: false,
			}
		}
	} else if (player[0] == 3){ //шаг 3
		if (request.command == "узнать предсказание"){
			player[0] = 101;
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = player[2] + ', прежде, чем я расскажу, что тебя ждёт, тебе неоходимо ответить на несколько вопросов.\n Итак, какой твой любимый цвет?';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		}else if (request.command == "записать послание"){
			player[0] = 201;
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = player[2] + ', я могу запомнить твоё романтическое послание для какого-то имени. И когда человек с этим именем зайдёт сюда, я смогу ему твоё послание прочитать. Сначала скажи имя человека, для которого будет послание.';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		}else if (request.command == "послушать сообщения"){
			player[0] = 301;
			var romanticName = getName(player[2]);
			player[11] = romanticName.name;
			player[12] = 0;
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			try {
				var fileContent_2 = fs.readFileSync(romanticName.name + '.txt', "utf8");
				var romanticText = fileContent_2.split('<br>');
			} catch (err) {
				toText = player[2] + ', на твоё имя пока ещё никто сообщений не оставлял.';
				return {
					version,
					session,
					response: {
						text: toText,
						buttons: [
							{
								title: "главное меню",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			};
			toText = player[2] + ', на твоё имя оставлено сообщений: '+romanticText.length+'.\n Будешь прослушивать подряд или какое-то одно?';
			return {
				version,
				session,
				response: {
					text: toText,
					buttons: [
						{
							title: "подряд",
							hide: true,
						},
						{
							title: "одно",
							hide: true,
						},
						{
							title: "отмена",
							hide: true,
						},
					],
					end_session: false,
				}
			}
		}else{
			return {
				version,
				session,
				response: {
					text: 'Что выбираешь? Узнать предсказание, записать послание или послушать сообщения?',
				buttons: [
					{
						title: "узнать предсказание",
						hide: true,
					},
					{
						title: "записать послание",
						hide: true,
					},
					{
						title: "послушать сообщения",
						hide: true,
					},
				],
					end_session: false,
				}
			}
		}
//------------часть-1		
	} else if ((+player[0] > 100)&(+player[0] < 200)){ //шаг 3
		if (player[0] == 101){
			if (request.command == 'красный'){color = {'color_1': 'красное', 'color_2': 'красного', 'color_3': 'красному'} //цвет
			}else if (request.command == 'оранжевый'){color = {'color_1': 'оранжевое', 'color_2': 'оранжевого', 'color_3': 'оранжевому'}
			}else if ((request.command == 'жёлтый')||(request.command == 'желтый')){color = {'color_1': 'жёлтое', 'color_2': 'жёлтого', 'color_3': 'жёлтому'}
			}else if ((request.command == 'зелёный')||(request.command == 'зеленый')){color = {'color_1': 'зелёное', 'color_2': 'зелёного', 'color_3': 'зелёному'}
			}else if (request.command == 'голубой'){color = {'color_1': 'голубое', 'color_2': 'голубого', 'color_3': 'голубому'}
			}else if (request.command == 'синий'){color = {'color_1': 'синее', 'color_2': 'синего', 'color_3': 'синему'}
			}else if (request.command == 'фиолетовый'){color = {'color_1': 'фиолетовое', 'color_2': 'фиолетового', 'color_3': 'фиолетовому'}
			}else if ((request.command == 'чёрный')||(request.command == 'черный')){color = {'color_1': 'чёрное', 'color_2': 'чёрного', 'color_3': 'чёрному'}
			}else if (request.command == 'белый'){color = {'color_1': 'белое', 'color_2': 'белого', 'color_3': 'белому'}
			}else if (request.command == 'малиновый'){color = {'color_1': 'малиновое', 'color_2': 'малинового', 'color_3': 'малиновому'}
			}else if (request.command == 'сиреневый'){color = {'color_1': 'сиреневое', 'color_2': 'сиреневого', 'color_3': 'сиреневому'}
			}else if (request.command == 'розовый'){color = {'color_1': 'розовое', 'color_2': 'розового', 'color_3': 'розовому'}
			}else if (request.command == 'коричневый'){color = {'color_1': 'коричневое', 'color_2': 'коричневого', 'color_3': 'коричневому'}
			}else if (request.command == 'золотой'){color = {'color_1': 'золотое', 'color_2': 'золотого', 'color_3': 'золотому'}
			}else if (request.command == 'серебряный'){color = {'color_1': 'серебряное', 'color_2': 'серебряного', 'color_3': 'серебряному'}
			}else if (request.command == 'бордовый'){color = {'color_1': 'бордовое', 'color_2': 'бордового', 'color_3': 'бордовому'}
			}else{color = {'color_1': 'красивое', 'color_2': 'красивого', 'color_3': 'красивому'}}
			player[0] = 102
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'Назови любое имя';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 102){ //шаг 4
			player[4] = request.command.toLocaleLowerCase(); //имя
			player[0] = 103
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'Назови какое-нибудь животное';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 103){ //шаг 5
			player[5] = request.command //животное
			player[0] = 104
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'Назови предмет';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 104){ //шаг 6
			player[6] = request.command //предмет
			player[0] = 105
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'Назови какое-нибудь действие, например сидеть, отдыхать, гулять или другое';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 105){ //шаг 7
			player[7] = request.command //действие
			player[0] = 106
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'А теперь назови прилагательное, например быстрый, большой, красивый или другое';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 106){ //шаг 8
			adjective = request.command
			adjectives = {'adjective_1':adjective, 'adjective_2':adjective.slice(0, -2)+'ая'}
			player[8] = request.command //прилагательное_1
			player[0] = 107
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'Ну и ещё одно прилагательное, например смелый, классный или другое';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 107){ //шаг 9
			adjective_2 = request.command
			adjectives_2 = {'adjective_1':adjective_2, 'adjective_2':adjective_2.slice(0, -2)+'ая'}
			player[9] = request.command //прилагательное_2
			player[0] = 108
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'А теперь, готов ли ты услышать романтическое предсказание?';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		} else if (player[0] == 108){ //шаг 10
			fs.writeFile(session.user_id + '.txt', "0 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0", (err) => {
				if (err) throw err;
			});
			name_1 = getName(player[4].toLocaleLowerCase()) //имя из базы
			if (name_1.sex=="ж"){
				word_1 = "а";
				pronoun="неё";
				player[8] = adjectives.adjective_2;
				player[9] = adjectives_2.adjective_2;
			}else{
				word_1 = "";
				pronoun="него";
				player[8] = adjectives.adjective_1;
				player[9] = adjectives_2.adjective_1;
			}
			var rand = Math.random() * 5;
			rand = Math.floor(rand);
			if (rand == 0){
				player[3] = color.color_1
				toText = player[2] + ', самые лучшие романтические приключения ждут тебя! Отправляйся на ' + player[3] + ' море. Когда ты будешь ' + player[7] + ' на берегу, ты увидишь, что тонет ' + player[5] + '. Спаси это животное. Это домашний питомец человека по имени ' + player[4] + '. И ты получишь от ' + pronoun + ' подарок на память. Это ' + player[6] + '. ' + player[4] + player[8] + ' и ' + player[9] + '. ' + name_1.diminutive + ' тот человек, о котором ты мечтаешь.';
			}else if (rand == 1){
				name_2 = getName(player[2].toLocaleLowerCase()); //имя из базы
				if (name_2.sex=="ж"){
					player[8] = adjectives.adjective_2;
				}else{
					player[8] = adjectives.adjective_1;
				}
				player[3] = color.color_2;
				toText = player[2] + ', да позвони же уже, позвони. Хватит тут ' + player[7] + ' и изображать, будто ты ' + player[5] + '. Ты же ' + player[8] + '. А ' + player[4] + ' ' + player[9] + ' и будет очень радоваться твоему звонку';
			}else if (rand == 2){
				player[3] = color.color_2;
				player[8] = adjectives.adjective_1;
				toText = player[2] + ', в полночь найди поляну с одиноким деревом. Там, под деревом, сундук. Возле сундука будет ' + player[7] + ' ' + player[5] + '. Зверь хоть и ' + player[8] + ', но не опасный. В сундуке ' + player[6] + ' ' + player[3] + ' цвета. ' + player[6] + ' оставь на месте, а вот зверя подари ' + name_1.name_1 + '. Это будет самый лучший для ' + pronoun + ' подарок.';
			}else if (rand == 3){
				player[3] = color.color_2;
				player[8] = adjectives.adjective_2;
				toText = player[2] + ', ' + player[6] + ' ' + player[3] + ' цвета - это то, о чём мечтаешь ты. А для ' + name_1.name_2 + ' лучший подарок - ' + player[5] + '. Подари ' + name_1.name_1 + ' этого зверька и тогда вы точно будете вместе. Из вас получится' + player[8] + ' пара. Вам будет хорошо, когда вы будете вместе ' + player[7] + '.';
			}else{
				player[3] = color.color_3;
				player[8] = adjectives.adjective_1;
				player[4] = player[4].charAt(0).toUpperCase() + player[4].slice(1);
				toText = player[2] + ', послушай хорошего совета. Не ссорься с ' + name_1.name_3 + '.  ' + player[4] + ' хороший, хоть и ' + player[8] + ' человек. Ну а если поссоришься, тогда сделай так, чтобы ' + player[4] + ' увидел' + word_1 + ', как ' + player[5] + ' ' + player[3] + ' цвета может ' + player[7] + ' и при этом в лапах будет ' + player[6] + '. Ну, или скажи ' + name_1.name_1 + ' что-нибудь доброе. Уж не знаю, что для тебя будет проще.';
			}
			if (request.command == 'да'){
				toText = toText;
			}else if (request.command == 'нет'){
				toText = 'не хочешь. а я всё равно расскажу.\n ' + toText;
			} else {
				toText = 'не понимаю. но я всё равно расскажу.\n ' + toText;
			}
			return {
				version,
				session,
				response: {
					text: toText,
					buttons: [
						{
							title: "ещё",
							hide: true,
						},
						{
							title: "закончить",
							hide: true,
						},
					],
					end_session: false,
				}
			}
		}
//----------------часть-2
	} else if ((+player[0] > 200)&(+player[0] < 300)){ //шаг 3
		if (player[0] == 201){
			player[4] = request.command; //имя
			player[0] = 202
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'А теперь говори послание, я запоминаю.';
			return {
				version,
				session,
				response: {
					text: toText,
					end_session: false,
				}
			}
		}else if (player[0] == 202){
			player[0] = 203
			player[10] = request.command
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			toText = 'Вот твоё сообщение: \n ' + request.command + '.\n Запомнить это или скажешь другое?';
			return {
				version,
				session,
				response: {
					text: toText,
					buttons: [
						{
							title: "запомнить",
							hide: true,
						},
						{
							title: "скажу другое",
							hide: true,
						},
						{
							title: "отмена",
							hide: true,
						},
					],
					end_session: false,
				}
			}		
		}else if (player[0] == 203){
			if (request.command=="запомнить"){
				player[0] = 204
				fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
					if (err) throw err;
				});
				var romanticName = getName(player[4]);
				try {
					var fileContent_2 = fs.readFileSync(romanticName.name + '.txt', "utf8");
					var romanticText = fileContent_2.split('<br>');
				} catch (err) {
					fs.writeFileSync(romanticName.name + '.txt', " ");
					var romanticText = [];
				};
				romanticText[romanticText.length] = player[10];
				fs.writeFile(romanticName.name + '.txt', romanticText.join('<br>'), (err) => {
					if (err) throw err;
				});
				toText = 'Всё готово, сообщение запомнено. Когда '+player[4]+' появится, я предложу прослушать твоё романтическое сообщение. \n А сейчас можно вернуться в главное меню или закончить.';
				return {
					version,
					session,
					response: {
						text: toText,
						buttons: [
							{
								title: "главное меню",
								hide: true,
							},
							{
								title: "закончить",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			}else if(request.command=="скажу другое"){
				player[0] = 202
				return {
					version,
					session,
					response: {
						text: 'Итак, говори своё романтическое послание.',
						buttons: [
							{
								title: "отмена",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			}else{
				return {
					version,
					session,
					response: {
						text: 'Я не понимаю. Запомнить или скажешь другое?',
						buttons: [
							{
								title: "запомнить",
								hide: true,
							},
							{
								title: "скажу другое",
								hide: true,
							},
							{
								title: "отмена",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			}
		}
//---------------часть-3
	} else if (+player[0] > 300){
		if ((player[0] == 301)||(player[0] == 302)){
			if ((request.command=="подряд")||(player[0] == 302)){
				player[0] = 302;
				try {
					var fileContent_2 = fs.readFileSync(player[11] + '.txt', "utf8");
					var romanticText = fileContent_2.split('<br>');
				} catch (err) {}
				if (+player[12] +1< romanticText.length){
					toText = romanticText[+player[12]]+'\n Прочитать ещё?';
					var toButton = "ещё";
					player[12] = +player[12] +1;
				}else{
					toText = romanticText[+player[12]];
					var toButton = "главное меню";
				}
				fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
					if (err) throw err;
				});
				return {
					version,
					session,
					response: {
						text: toText,
						buttons: [
							{
								title: toButton,
								hide: true,
							},
							{
								title: "отмена",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			} else if ((request.command=="одно")||(request.command=="прочитать")){
				player[0] = 303;
				fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
					if (err) throw err;
				});
				try {
					var fileContent_2 = fs.readFileSync(player[11] + '.txt', "utf8");
					var romanticText = fileContent_2.split('<br>');
				} catch (err) {}
				toText = 'Всего сообщений: '+romanticText.length+'. \n Введи номер сообщения, которое необходимо прочитать.';
				return {
					version,
					session,
					response: {
						text: toText,
						buttons: [
							{
								title: "отмена",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			} else{
			}
		} else if (player[0] == 303){
			player[0] = 301;
			fs.writeFile(session.user_id + '.txt', player.join(' + '), (err) => {
				if (err) throw err;
			});
			try {
				var fileContent_2 = fs.readFileSync(player[11] + '.txt', "utf8");
				var romanticText = fileContent_2.split('<br>');
			} catch (err) {}
			if (+request.command > romanticText.length){
				toText = 'Сообщения под номером '+request.command+'\n не существует. Прочитать другое сообщение?';
				return {
					version,
					session,
					response: {
						text: toText,
						buttons: [
							{
								title: "прочитать",
								hide: true,
							},
							{
								title: "отмена",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			}else{
				toText = romanticText[+request.command-1]+'\n  Прочитать ещё сообщение?';
				return {
					version,
					session,
					response: {
						text: toText,
						buttons: [
							{
								title: "прочитать",
								hide: true,
							},
							{
								title: "отмена",
								hide: true,
							},
						],
						end_session: false,
					}
				}
			}
		}
	}
		
	function getName(names){
		if((names=="александр")||(names=="санек")||(names=="шурик")){forName={"name":"Александр","full":"Александр","diminutive":"Сашенька","name_1":"Саше","name_2":"Саши","name_3":"","sex":"м"}
	}else if((names=="александра")||(names=="аля"))	{forName={"name":"Александра","full":"Александра","diminutive":"Сашенька","name_1":"Саше","name_2":"Саши","name_3":"","sex":"ж"}
	}else if((names=="алексей")||(names=="леша")||(names=="леха")||(names=="алекс")||(names=="алешка")||(names=="алеша")){forName={"name":"Алексей","full":"Алексей","diminutive":"Алёша","name_1":"Лёше","name_2":"Лёши","name_3":"","sex":"м"}
	}else if((names=="алена")||(names=="аленка")||(names=="аленушка")){forName={"name":"Алёна","full":"Алёна","diminutive":"Алёнушка","name_1":"Алёне","name_2":"Алёны","name_3":"","sex":"ж"}
	}else if((names=="алина")||(names=="алинка")||(names=="алиночка")){forName={"name":"Алина","full":"Алина","diminutive":"Алиночка","name_1":"Алине","name_2":"Алины","name_3":"","sex":"ж"}
	}else if((names=="алиса")||(names=="алиска")||(names=="алисочка")||(names=="алисонька")){forName={"name":"Алиса","full":"Алиса","diminutive":"Алисонька","name_1":"Алисе","name_2":"Алисы","name_3":"","sex":"ж"}
	}else if((names=="алия")){forName={"name":"Алия","full":"Алия","diminutive":"","name_1":"Алии","name_2":"Алии","name_3":"","sex":"ж"}
	}else if((names=="алла")||(names=="аллочка")){forName={"name":"Алла","full":"Алла","diminutive":"Аллочка","name_1":"Алле","name_2":"Аллы","name_3":"","sex":"ж"}
	}else if((names=="альберт")||(names=="алик")||(names=="альбертик")){forName={"name":"Альберт","full":"Альберт","diminutive":"Альбертик","name_1":"Альберту","name_2":"Альберта","name_3":"","sex":"м"}
	}else if((names=="альбина")||(names=="альбиночка")){forName={"name":"Альбина","full":"Альбина","diminutive":"Альбиночка","name_1":"Альбине","name_2":"Альбины","name_3":"","sex":"ж"}
	}else if((names=="амир")||(names=="амирчик")){forName={"name":"Амир","full":"Амир","diminutive":"Амирчик","name_1":"Амиру","name_2":"Амира","name_3":"","sex":"м"}
	}else if((names=="анастасия")||(names=="настасья")||(names=="настя")||(names=="настюша")||(names=="ася")||(names=="стася")||(names=="настенька")||(names=="настена")){forName={"name":"Анастасия","full":"Анастасия","diminutive":"Настенька","name_1":"Насте","name_2":"Насти","name_3":"","sex":"ж"}
	}else if((names=="анатолий")||(names=="толя")||(names=="толик")||(names=="толян")||(names=="толенька")){forName={"name":"Анатолий","full":"Анатолий","diminutive":"Толенька","name_1":"Толе","name_2":"Толи","name_3":"","sex":"м"}
	}else if((names=="ангелина")||(names=="ангела")||(names=="геля")||(names=="лина")||(names=="ангелиночка")){forName={"name":"Ангелина","full":"Ангелина","diminutive":"Ангелиночка","name_1":"Ангелине","name_2":"Ангелины","name_3":"","sex":"ж"}
	}else if((names=="андрей")||(names=="андрейка")||(names=="андрюха")||(names=="андрюша")||(names=="андрюшенька")){forName={"name":"Андрей","full":"Андрей","diminutive":"Андрюша","name_1":"Андрею","name_2":"Андрея","name_3":"","sex":"м"}
	}else if((names=="анжелика")||(names=="лика")){forName={"name":"Анжелика","full":"Анжелика","diminutive":"Анжелика","name_1":"Анжелике","name_2":"Анжелики","name_3":"","sex":"ж"}
	}else if((names=="анжэла")||(names=="анжела")||(names=="анжелочка")){forName={"name":"Анжела","full":"Анжела","diminutive":"Анжелочка","name_1":"Анжеле","name_2":"Анжелы","name_3":"","sex":"ж"}
	}else if((names=="анна")||(names=="аня")||(names=="анька")||(names=="анюта")||(names=="анечка")){forName={"name":"Анна","full":"Анна","diminutive":"Анечка","name_1":"Ане","name_2":"Ани","name_3":"","sex":"ж"}
	}else if((names=="антон")||(names=="антошка")||(names=="антоха")||(names=="антоша")){forName={"name":"Антон","full":"Антон","diminutive":"Антоша","name_1":"Антону","name_2":"Антона","name_3":"","sex":"м"}
	}else if((names=="антонина")||(names=="тоша")||(names=="тоня")||(names=="тонечка")){forName={"name":"Антонина","full":"Антонина","diminutive":"Тонечка","name_1":"Тоне","name_2":"Тони","name_3":"","sex":"ж"}
	}else if((names=="антонио")){forName={"name":"Антонио","full":"Антонио","diminutive":"Антонио","name_1":"Антонио","name_2":"Антонио","name_3":"","sex":"м"}
	}else if((names=="арам")||(names=="арамчик")||(names=="арамушка")||(names=="арик")){forName={"name":"Арам","full":"Арам","diminutive":"Арамчик","name_1":"Араму","name_2":"Арама","name_3":"","sex":"м"}
	}else if((names=="арина")||(names=="ариша")||(names=="аришка")||(names=="ариночка")||(names=="ариадна")){forName={"name":"Арина","full":"Арина","diminutive":"Ариночка","name_1":"Арине","name_2":"Арины","name_3":"","sex":"ж"}
	}else if((names=="аркадий")||(names=="аркаша")||(names=="кеша")){forName={"name":"Аркадий","full":"Аркадий","diminutive":"Кеша","name_1":"Аркадию","name_2":"Аркадия","name_3":"","sex":"м"}
	}else if((names=="арсений")||(names=="сеня")||(names=="сенечка")){forName={"name":"Арсений","full":"Арсений","diminutive":"Сенечка","name_1":"Сене","name_2":"Сени","name_3":"","sex":"м"}
	}else if((names=="артем")||(names=="тема")||(names=="артём")||(names=="тёма")||(names=="артемий")||(names=="артемушка")||(names=="артёмушка")){forName={"name":"Артём","full":"Артём","diminutive":"Артёмушка","name_1":"Артёму","name_2":"Артёма","name_3":"","sex":"м"}
	}else if((names=="артур")||(names=="артурчик")){forName={"name":"Артур","full":"Артур","diminutive":"Артурчик","name_1":"Артуру","name_2":"Артура","name_3":"","sex":"м"}
	}else if((names=="аслан")||(names=="асланчик")){forName={"name":"Аслан","full":"Аслан","diminutive":"Асланчик","name_1":"Аслану","name_2":"Аслана","name_3":"","sex":"м"}
	}else if((names=="ашот")){forName={"name":"Ашот","full":"Ашот","diminutive":"Ашотик","name_1":"Ашоту","name_2":"Ашота","name_3":"","sex":"м"}
	}else if((names=="богдан")||(names=="богдаша")||(names=="богданчик")){forName={"name":"Богдан","full":"Богдан","diminutive":"Богдаша","name_1":"Богдану","name_2":"Богдана","name_3":"","sex":"м"}
	}else if((names=="борис")||(names=="боря")||(names=="бориска")||(names=="боренька")){forName={"name":"Борис","full":"Борис","diminutive":"Боренька","name_1":"Борису","name_2":"Бориса","name_3":"","sex":"м"}
	}else if((names=="вадим")||(names=="вадимка")||(names=="ваденька")||(names=="вадик")){forName={"name":"Вадим","full":"Вадим","diminutive":"Ваденька","name_1":"Вадиму","name_2":"Вадима","name_3":"","sex":"м"}
	}else if((names=="валентин")||(names=="валек")){forName={"name":"Валентин","full":"Валентин","diminutive":"Валечка","name_1":"Валентину","name_2":"Валентина","name_3":"","sex":"м"}
	}else if((names=="валентина")){forName={"name":"Валентина","full":"Валентина","diminutive":"Валечка","name_1":"Валентине","name_2":"Валентины","name_3":"","sex":"ж"}
	}else if((names=="валерий")||(names=="валера")||(names=="валерочка")||(names=="Валерка")){forName={"name":"Валерий","full":"Валерий","diminutive":"Валерик","name_1":"Валерию","name_2":"Валерия","name_3":"","sex":"м"}
	}else if((names=="валерия")||(names=="лера")||(names=="лерочка")){forName={"name":"Валерия","full":"Валерия","diminutive":"Лерочка","name_1":"Лере","name_2":"Леры","name_3":"","sex":"ж"}
	}else if((names=="валя")){forName={"name":"Валя","full":"","diminutive":"Валечка","name_1":"Вале","name_2":"Вали","name_3":"","sex":"н"}
	}else if((names=="варвара")||(names=="варя")||(names=="варюша")||(names=="варечка")){forName={"name":"Варвара","full":"Варвара","diminutive":"Варечка","name_1":"Варе","name_2":"Вари","name_3":"","sex":"ж"}
	}else if((names=="василий")||(names=="вася")||(names=="васек")||(names=="васька")||(names=="васенька")){forName={"name":"Василий","full":"Василий","diminutive":"Васенька","name_1":"Васе","name_2":"Васи","name_3":"","sex":"м"}
	}else if((names=="василиса")||(names=="васена")){forName={"name":"Василиса","full":"Василиса","diminutive":"Васёна","name_1":"Василисе","name_2":"Василисы","name_3":"","sex":"ж"}
	}else if((names=="вера")||(names=="верунчик")||(names=="верочка")){forName={"name":"Вера","full":"Вера","diminutive":"Верочка","name_1":"Вере","name_2":"Веры","name_3":"","sex":"ж"}
	}else if((names=="вероника")||(names=="ника")||(names=="вероничка")){forName={"name":"Вероника","full":"Вероника","diminutive":"Вероничка","name_1":"Веронике","name_2":"Вероники","name_3":"","sex":"ж"}
	}else if((names=="виктор")||(names=="витя")||(names=="витек")||(names=="витечка")){forName={"name":"Виктор","full":"Виктор","diminutive":"Витенька","name_1":"Вите","name_2":"Вити","sex":"м"}
	}else if((names=="виктория")||(names=="вика")||(names=="викочка")||(names=="викуся")||(names=="викуля")){forName={"name":"Виктория","full":"Виктория","diminutive":"Викуся","name_1":"Вике","name_2":"Вики","name_3":"","sex":"ж"}
	}else if((names=="виолетта")||(names=="виола")||(names=="вета")){forName={"name":"Виолетта","full":"Виолетта","diminutive":"Виолетточка","name_1":"Виолетте","name_2":"Виолетты","name_3":"","sex":"ж"}
	}else if((names=="виталий")||(names=="виталя")||(names=="виталик")){forName={"name":"Виталий","full":"Виталий","diminutive":"Виталенька","name_1":"Виталию","name_2":"Виталия","name_3":"","sex":"м"}
	}else if((names=="влада")||(names=="владочка")){forName={"name":"Влада","full":"Влада","diminutive":"Владочка","name_1":"Владе","name_2":"Влады","name_3":"","sex":"ж"}
	}else if((names=="владимир")||(names=="вова")||(names=="володя")||(names=="володенька")||(names=="вовик")||(names=="вовка")||(names=="вовочка")){forName={"name":"Владимир","full":"Владимир","diminutive":"Вовочка","name_1":"Володе","name_2":"Володи","name_3":"","sex":"м"}
	}else if((names=="владислав")||(names=="влад")||(names=="владик")){forName={"name":"Владислав","full":"Владислав","diminutive":"Владик","name_1":"Владиславу","name_2":"Владислава","name_3":"","sex":"м"}
	}else if((names=="вячеслав")||(names=="слава")||(names=="славик")){forName={"name":"Вячеслав","full":"Вячеслав","diminutive":"Славик","name_1":"Славе","name_2":"Славы","name_3":"","sex":"м"}
	}else if((names=="галина")||(names=="галя")||(names=="галинка")||(names=="галочка")){forName={"name":"Галина","full":"Галина","diminutive":"Галочка","name_1":"Гале","name_2":"Гали","name_3":"","sex":"ж"}
	}else if((names=="геннадий")||(names=="гена")||(names=="геночка")){forName={"name":"Геннадий","full":"Геннадий","diminutive":"Геночка","name_1":"Гене","name_2":"Гены","name_3":"","sex":"м"}
	}else if((names=="георгий")||(names=="гоша")||(names=="жора")||(names=="жорик")){forName={"name":"Георгий","full":"Георгий","diminutive":"Гошенька","name_1":"Гоше","name_2":"Гоши","name_3":"","sex":"м"}
	}else if((names=="григорий")||(names=="гриша")||(names=="гришка")){forName={"name":"Григорий","full":"Григорий","diminutive":"Гришенька","name_1":"Грише","name_2":"Гриши","name_3":"","sex":"м"}
	}else if((names=="глеб")||(names=="глебушка")||(names=="глебка")){forName={"name":"Глеб","full":"Глеб","diminutive":"Глебушка","name_1":"Глебу","name_2":"Глеба","name_3":"","sex":"м"}
	}else if((names=="давид")){forName={"name":"Давид","full":"Давид","diminutive":"Давидушка","name_1":"Давиду","name_2":"Давида","name_3":"","sex":"м"}
	}else if((names=="дамир")||(names=="дамирчик")){forName={"name":"Дамир","full":"Дамир","diminutive":"Дамирчик","name_1":"Дамиру","name_2":"Дамира","name_3":"","sex":"м"}
	}else if((names=="даниил")){forName={"name":"Даниил","full":"Даниил","diminutive":"Данечка","name_1":"Даниилу","name_2":"Даниила","name_3":"","sex":"м"}
	}else if((names=="данил")||(names=="даня")||(names=="данька")||(names=="данилка")||(names=="данилушка")||(names=="данечка")||(names=="даник")){forName={"name":"Данил","full":"Данил","diminutive":"Данечка","name_1":"Данику","name_2":"Даника","name_3":"","sex":"м"}
	}else if((names=="данила")){forName={"name":"Данила","full":"Данила","diminutive":"Данечка","name_1":"Данилу","name_2":"Данилы","name_3":"","sex":"м"}
	}else if((names=="даниэль")){forName={"name":"Даниэль","full":"Даниэль","diminutive":"","name_1":"Даниэлю","name_2":"Даниэля","name_3":"","sex":"м"}
	}else if((names=="дарина")){forName={"name":"Дарина","full":"Дарина","diminutive":"Дариночка","name_1":"Дарине","name_1":"Дарины","name_3":"","sex":"ж"}
	}else if((names=="дарья")||(names=="дария")||(names=="даша")||(names=="дашка")||(names=="дашечка")||(names=="дашок")||(names=="дарьюшка")||(names=="дашенька")||(names=="дашуня")){forName={"name":"Дарья","full":"Дарья","diminutive":"Дашуля","name_1":"Даше","name_2":"Даши","name_3":"","sex":"ж"}
	}else if((names=="денис")||(names=="дениска")||(names=="дэн")){forName={"name":"Денис","full":"Денис","diminutive":"Денисочка","name_1":"Денису","name_2":"Дениса","name_3":"","sex":"м"}
	}else if((names=="джеймс")){forName={"name":"Джеймс","full":"","diminutive":"","name_1":"Джеймсу","name_2":"Джеймса","name_3":"","sex":"м"}
	}else if((names=="джонни")){forName={"name":"Джонни","full":"","diminutive":"","name_1":"Джонни","name_2":"Джонни","name_3":"","sex":"м"}
	}else if((names=="диана")||(names=="дианка")||(names=="дианочка")){forName={"name":"Диана","full":"Диана","diminutive":"Дианочка","name_1":"Диане","name_2":"Дианы","name_3":"","sex":"ж"}
	}else if((names=="динара")){forName={"name":"Динара","full":"Динара","diminutive":"","name_1":"Динаре","name_2":"Динары","name_3":"","sex":"ж"}
	}else if((names=="дмитрий")||(names=="дима")||(names=="митя")||(names=="митенька")||(names=="димочка")){forName={"name":"Дмитрий","full":"Дмитрий","diminutive":"Димочка","name_1":"Диме","name_2":"Димы","name_3":"","sex":"м"}
	}else if((names=="ева")){forName={"name":"Ева","full":"Ева","diminutive":"Евочка","name_1":"Еве","name_2":"Евы","name_3":"","sex":"ж"}
	}else if((names=="евгений")||(names=="жека")||(names=="женек")){forName={"name":"Евгений","full":"Евгений","diminutive":"Женечка","name_1":"Жене","name_2":"Жени","name_3":"","sex":"м"}
	}else if((names=="евгения")){forName={"name":"Евгения","full":"Евгения","diminutive":"Женечка","name_1":"Жене","name_2":"Жени","name_3":"","sex":"ж"}
	}else if((names=="егор")||(names=="егорка")||(names=="гога")||(names=="егорушка")){forName={"name":"Егор","full":"Егор","diminutive":"Егорушка","name_1":"Егору","name_2":"Егора","name_3":"","sex":"м"}
	}else if((names=="екатерина")||(names=="катерина")||(names=="катя")||(names=="кать")||(names=="катюха")||(names=="катька")||(names=="катенька")||(names=="катюша")){forName={"name":"Екатерина","full":"Екатерина","diminutive":"Катюша","name_1":"Кате","name_2":"Кати","name_3":"","sex":"ж"}
	}else if((names=="елена")||(names=="лена")||(names=="ленуся")||(names=="еленка")||(names=="ленуся")||(names=="леночка")){forName={"name":"Елена","full":"Елена","diminutive":"Леночка","name_1":"Лене","name_2":"Лены","name_3":"","sex":"ж"}
	}else if((names=="елизавета")||(names=="лизавета")||(names=="лиза")||(names=="лизка")||(names=="лизочка")){forName={"name":"Елизавета","full":"Елизавета","diminutive":"Лизонька","name_1":"Лизе","name_2":"Лизы","name_3":"","sex":"ж"}
	}else if((names=="емеля")){forName={"name":"Емеля","full":"Емеля","diminutive":"Емелюшка","name_1":"Емеле","name_2":"Емели","name_3":"","sex":"м"}
//
	}else if((names=="жанна")){forName={"name":"Жанна","full":"Жанна","diminutive":"Жанночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="женя")){forName={"name":"Женя","full":"","diminutive":"Женечка","name_1":"","name_2":"","name_3":"","sex":"н"}
	}else if((names=="захар")){forName={"name":"Захар","full":"Захар","diminutive":"Захарушка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="злата")){forName={"name":"Злата","full":"Злата","diminutive":"Златочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="зоя")||(names=="зоенька")||(names=="зоечка")){forName={"name":"Зоя","full":"Зоя","diminutive":"Зоечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="иван")||(names=="ваня")||(names=="ванюша")||(names=="ванька")||(names=="ванечка")){forName={"name":"Иван","full":"Иван","diminutive":"Ванечка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="игорь")||(names=="игорек")){forName={"name":"Игорь","full":"Игорь","diminutive":"Игорёша","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="ильдар")){forName={"name":"Ильдар","full":"Ильдар","diminutive":"","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="илья")||(names=="илюха")||(names=="илюша")){forName={"name":"Илья","full":"Илья","diminutive":"Илюша","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="инна")){forName={"name":"Инна","full":"Инна","diminutive":"","name_1":"","name_2":"","sex":"ж"}
	}else if((names=="ирина")||(names=="ира")||(names=="ируся")||(names=="ирочка")||(names=="иринка")||(names=="ириша")||(names=="иришка")){forName={"name":"Ирина","full":"Ирина","diminutive":"Ирочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="карим")){forName={"name":"Карим","full":"Карим","diminutive":"Каримчик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="карина")){forName={"name":"Карина","full":"Карина","diminutive":"Кариночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="карэн")||(names=="карен")){forName={"name":"Карен","full":"Карен","diminutive":"Каренушка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="кира")){forName={"name":"Кира","full":"Кира","diminutive":"Кирочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="кирилл")||(names=="кирюха")||(names=="кир")){forName={"name":"Кирилл","full":"Кирилл","diminutive":"Кирюша","name_1":"","name_2":"","sex":"м"}
	}else if((names=="константин")||(names=="костя")||(names=="костян")||(names=="костик")){forName={"name":"Константин","full":"Константин","diminutive":"Костик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="кристина")||(names=="кристя")||(names=="кристиночка")){forName={"name":"Кристина","full":"Кристина","diminutive":"Кристиночка","name_1":"","name_1":"","name_3":"","sex":"ж"}
	}else if((names=="ксения")||(names=="ксюша")||(names=="ксю")||(names=="ксюха")||(names=="ксюшенька")||(names=="ксюня")){forName={"name":"Ксения","full":"Ксения","diminutive":"Ксюшенька","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="лада")||(names=="ладушка")||(names=="ладочка")||(names=="ладка")){forName={"name":"Лада","full":"Лада","diminutive":"Ладушка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="лариса")||(names=="лора")||(names=="лорик")||(names=="лара")||(names=="ларисочка")){forName={"name":"Лариса","full":"Лариса","diminutive":"Ларисочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="лаура")){forName={"name":"Лаура","full":"Лаура","diminutive":"Лаурочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="лев")||(names=="лева")){forName={"name":"Лев","full":"Лев","diminutive":"Лёва","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="леонид")||(names=="леня")){forName={"name":"Леонид","full":"Леонид","diminutive":"Лёнечка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="лидия")||(names=="лида")||(names=="лидочка")||(names=="лидок")){forName={"name":"Лидия","full":"Лидия","diminutive":"Лидочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="лилия")||(names=="лиля")){forName={"name":"Лилия","full":"Лилия","diminutive":"Лилечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="любовь")||(names=="люба")||(names=="любаша")||(names=="любонька")||(names=="Любочка")){forName={"name":"Любовь","full":"Любовь","diminutive":"Любочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="людмила")||(names=="люда")||(names=="людочка")||(names=="люся")||(names=="люсенька")){forName={"name":"Людмила","full":"Людмила","diminutive":"Людочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="майк")){forName={"name":"Майк","full":"","diminutive":"","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="максим")||(names=="макс")||(names=="максимка")){forName={"name":"Максим","full":"Максим","diminutive":"Максимушка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="маргарита")||(names=="марго")||(names=="рита")||(names=="риточка")){forName={"name":"Маргарита","full":"Маргарита","diminutive":"Риточка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="марик")){forName={"name":"Марик","full":"Марик","diminutive":"Марик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="марина")||(names=="маринка")||(names=="мариночка")){forName={"name":"Марина","full":"Марина","diminutive":"Мариночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="мария")||(names=="маша")||(names=="машка")||(names=="машуля")||(names=="машенька")||(names=="маня")||(names=="маруся")){forName={"name":"Мария","full":"Мария","diminutive":"Машуля","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="марк")){forName={"name":"Марк","full":"Марк","diminutive":"Маркуша","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="матвей")||(names=="матвейка")){forName={"name":"Матвей","full":"Матвей","diminutive":"Матвеюшка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="милана")){forName={"name":"Милана","full":"Милана","diminutive":"Миланочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="мирослав")){forName={"name":"Мирослав","full":"Мирослав","diminutive":"Мирославик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="михаил")||(names=="миша")||(names=="мишка")||(names=="мишутка")||(names=="мишенька")){forName={"name":"Михаил","full":"Михаил","diminutive":"Мишенька","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="мурат")){forName={"name":"Мурат","full":"Мурат","diminutive":"Муратик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="мэри")){forName={"name":"Мэри","full":"","diminutive":"","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="надежда")||(names=="надя")||(names=="надюша")||(names=="наденька")){forName={"name":"Надежда","full":"Надежда","diminutive":"Наденька","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="наталья")||(names=="наталия")||(names=="наташа")||(names=="наташенька")){forName={"name":"Наталья","full":"Наталья","diminutive":"Наташенька","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="никита")||(names=="никитос")||(names=="никитушка")){forName={"name":"Никита","full":"Никита","diminutive":"Никиточка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="николай")||(names=="коля")||(names=="колян")){forName={"name":"Николай","full":"Николай","diminutive":"Коленька","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="нина")||(names=="ниночка")||(names=="нинуся")){forName={"name":"Нина","full":"Нина","diminutive":"Ниночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="оксана")||(names=="ксана")||(names=="оксаночка")){forName={"name":"Оксана","full":"Оксана","diminutive":"Оксаночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="олег")||(names=="олежек")||(names=="олежка")){forName={"name":"Олег","full":"Олег","diminutive":"Олежек","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="олеся")||(names=="олесенька")||(names=="олеська")){forName={"name":"Олеся","full":"Олеся","diminutive":"Олесенька","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="ольга")||(names=="оля")||(names=="оленька")||(names=="оляша")||(names=="олечка")){forName={"name":"Ольга","full":"Ольга","diminutive":"Олечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="павел")||(names=="паша")||(names=="павлик")||(names=="пашок")||(names=="павлуша")||(names=="пашенька")){forName={"name":"Павел","full":"Павел","diminutive":"Пашенька","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="петр")||(names=="петя")||(names=="петька")||(names=="петенька")){forName={"name":"Пётр","full":"Пётр","diminutive":"Петруша","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="полина")||(names=="поля")||(names=="полиночка")||(names=="поленька")||(names=="полинка")){forName={"name":"Полина","full":"Полина","diminutive":"Полечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="равшан")){forName={"name":"Равшан","full":"Равшан","diminutive":"Равшанчик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="рамис")){forName={"name":"Рамис","full":"","diminutive":"Рамисик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="регина")){forName={"name":"Регина","full":"Регина","diminutive":"Региночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="ринат")){forName={"name":"Ринат","full":"Ринат","diminutive":"Ринатик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="роберт")){forName={"name":"Роберт","full":"Роберт","diminutive":"Робертик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="роза")||(names=="розочка")){forName={"name":"Роза","full":"Роза","diminutive":"Розочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="роман")||(names=="рома")||(names=="ромка")||(names=="ромаша")){forName={"name":"Роман","full":"Роман","diminutive":"Ромочка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="руслан")||(names=="рус")||(names=="русик")){forName={"name":"Руслан","full":"Руслан","diminutive":"Русланчик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="руслана")){forName={"name":"Руслана","full":"Руслана","diminutive":"Русланушка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="сабина")){forName={"name":"Сабина","full":"Сабина","diminutive":"","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="саша")||(names=="саня")||(names=="шура")||(names=="сашка")||(names=="сашуля")){forName={"name":"Саша","full":"","diminutive":"Сашенька","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="светлана")||(names=="света")||(names=="светочка")||(names=="светик")||(names=="светланка")){forName={"name":"Светлана","full":"Светлана","diminutive":"Светик","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="семен")||(names=="сема")||(names=="сеня")){forName={"name":"Семён","full":"Семён","diminutive":"Сенечка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="сергей")||(names=="сережа")||(names=="сережка")){forName={"name":"Сергей","full":"Сергей","diminutive":"Серёженька","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="снежана")||(names=="снежка")){forName={"name":"Снежана","full":"Снежана","diminutive":"Снежаночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="софия")||(names=="соня")||(names==софа)||(names==софочка)||(names==сонька)||(names==Софийка)){forName={"name":"София","full":"София","diminutive":"Сонечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="софья")){forName={"name":"Софья","full":"Софья","diminutive":"Сонечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="станислав")||(names=="стас")||(names=="стасик")){forName={"name":"Станислав","full":"Станислав","diminutive":"Стасик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="степан")||(names=="степа")||(names=="степаша")){forName={"name":"Степан","full":"Степан","diminutive":"Стёпушка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="тамара")||(names=="тома")){forName={"name":"Тамара","full":"Тамара","diminutive":"Тамарочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="татьяна")||(names=="таня")||(names=="танечка")||(names=="танюша")||(names=="танюшка")){forName={"name":"Татьяна","full":"Татьяна","diminutive":"Танюшка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="тимофей")||(names=="тимоха")||(names=="тима")||(names=="тимоша")){forName={"name":"Тимофей","full":"Тимофей","diminutive":"Тимоша","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="тимур")||(names=="тимурка")){forName={"name":"Тимур","full":"Тимур","diminutive":"Тимурик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="уля")||(names=="ульяна")||(names=="улечка")||(names=="ульяша")){forName={"name":"Ульяна","full":"Ульяна","diminutive":"Улечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="фархад")){forName={"name":"Фархад","full":"Фархад","diminutive":"Фархадик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="федор")||(names=="федя")||(names=="федюша")){forName={"name":"Фёдор","full":"Фёдор","diminutive":"Феденька","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="эдуард")||(names=="эдик")){forName={"name":"Эдуард","full":"Эдуард","diminutive":"Эдичка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="элла")){forName={"name":"Элла","full":"Элла","diminutive":"Эллочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="эльвира")){forName={"name":"Эльвира","full":"Эльвира","diminutive":"Эльвирочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="эльдар")){forName={"name":"Эльдар","full":"Эльдар","diminutive":"","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="эльмира")){forName={"name":"Эльмира","full":"Эльмира","diminutive":"Эльмирочка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="юлия")||(names=="юля")||(names=="юлька")||(names=="юленька")){forName={"name":"Юлия","full":"Юлия","diminutive":"Юлечка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="юрий")||(names=="юра")||(names=="юрик")){forName={"name":"Юрий","full":"Юрий","diminutive":"Юрочка","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else if((names=="яна")||(names=="яночка")){forName={"name":"Яна","full":"Яна","diminutive":"Яночка","name_1":"","name_2":"","name_3":"","sex":"ж"}
	}else if((names=="ярослав")||(names=="ярик")){forName={"name":"Ярослав","full":"Ярослав","diminutive":"Ярославик","name_1":"","name_2":"","name_3":"","sex":"м"}
	}else{forName={"name":names,"full":names,"diminutive":names,"name_1":"","name_2":"","name_3":"","sex":"м"}}
	return forName;
	}
}	
