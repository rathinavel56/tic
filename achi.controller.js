(function() {
    'use strict';
    angular
        .module('app')
        .controller('AchiController', AchiController);

    AchiController.$inject = ['$scope'];

    function AchiController($scope) {
        var model = this,
			cir1 = angular.element(document.getElementById("circle1")),
			cir2 = angular.element(document.getElementById("circle2")),
			cir3 = angular.element(document.getElementById("circle3")),
			cir4 = angular.element(document.getElementById("circle4")),
			cir5 = angular.element(document.getElementById("circle5")),
			cir6 = angular.element(document.getElementById("circle6")),
			cir7 = angular.element(document.getElementById("circle7")),
			cir8 = angular.element(document.getElementById("circle8")),
			cir9 = angular.element(document.getElementById("circle9")),
			playValid        = false,
			classUser        = 'user',
			classComputer    = 'computer',
            classPlayed      = 'played',	
			classEmptyCircle = 'emptycircle',
			msgPlayed        = "The circle has already been played. Please choose another circle",
			msgTie           = "Match Tie !!!! Please Play Again",
			msgSuccess       = "Congratulations, you own the match",
			msgFail          = "Sorry You lost the match!",
			win = false;
		$scope.resetBoard = function() {
			model.clearAchi();
		};
		$scope.circleSelect = function(event) {
			var clickedCircle = angular.element(document.getElementById(event.target.id)),
				playValid = model.validatePlay(clickedCircle);
				if (playValid) {
					clickedCircle.removeClass(classEmptyCircle)
								.addClass(classPlayed)
								.addClass(classUser);
					model.checkDrawMatch();
					model.checkAchiWin();
					model.computerplay();
				} else {
					swal(msgPlayed);
				}
		};
		model.validatePlay = function(circleplayed) {
			var playValid = false;
			if (circleplayed.hasClass(classEmptyCircle)) {
				return playValid = true;
			} else {
				return playValid = false;
			}
		};
		model.checkDrawMatch = function() {
			if (!(angular.element(document.getElementsByClassName("achi")).hasClass(classEmptyCircle))) {
				swal(msgTie);
				model.clearAchi();
			}
		};
		model.clearAchi = function() {
			angular.element(document.getElementsByClassName("achi"))
					.removeClass(classPlayed)
					.removeClass(classComputer)
					.removeClass(classUser)
					.addClass(classEmptyCircle);
		};
		model.winAchi = function(player) {
			var win = true;
			if (player == "user")
				swal(msgSuccess);
			else
				swal(msgFail);
			model.clearAchi();
		};
		model.checkAchiWin = function() {
			var move = [
				[cir1.hasClass(classUser),cir2.hasClass(classUser),cir3.hasClass(classUser)],
				[cir1.hasClass(classComputer),cir2.hasClass(classComputer),cir3.hasClass(classComputer)],
				[cir4.hasClass(classUser),cir5.hasClass(classUser),cir6.hasClass(classUser)],
				[cir4.hasClass(classComputer),cir5.hasClass(classComputer),cir6.hasClass(classComputer)],
				[cir7.hasClass(classUser),cir8.hasClass(classUser),cir9.hasClass(classUser)],
				[cir7.hasClass(classComputer),cir8.hasClass(classComputer),cir9.hasClass(classComputer)],
				[cir1.hasClass(classUser),cir4.hasClass(classUser),cir7.hasClass(classUser)],
				[cir1.hasClass(classComputer),cir4.hasClass(classComputer),cir7.hasClass(classComputer)],
				[cir5.hasClass(classUser),cir2.hasClass(classUser),cir8.hasClass(classUser)],
				[cir5.hasClass(classComputer),cir2.hasClass(classComputer),cir8.hasClass(classComputer)],
				[cir6.hasClass(classUser),cir9.hasClass(classUser),cir3.hasClass(classUser)],
				[cir6.hasClass(classComputer),cir9.hasClass(classComputer),cir3.hasClass(classComputer)],
				[cir1.hasClass(classUser),cir5.hasClass(classUser),cir9.hasClass(classUser)],
				[cir1.hasClass(classComputer),cir5.hasClass(classComputer),cir9.hasClass(classComputer)],
				[cir5.hasClass(classUser),cir7.hasClass(classUser),cir3.hasClass(classUser)],
				[cir5.hasClass(classComputer),cir7.hasClass(classComputer),cir3.hasClass(classComputer)]
			];
		    var cir123_user     = move[0][0] && move[0][1]&& move[0][2],
				cir123_computer = move[1][0] && move[1][1]&& move[1][2],
				cir456_user     = move[2][0] && move[2][1]&& move[2][2],
				cir456_computer = move[3][0] && move[3][1]&& move[3][2],
				cir789_user     = move[4][0] && move[4][1]&& move[4][2],
				cir789_computer = move[5][0] && move[5][1]&& move[5][2],
				cir147_user     = move[6][0] && move[6][1]&& move[6][2],
				cir147_computer = move[7][0] && move[7][1]&& move[7][2],
				cir528_user     = move[8][0] && move[8][1]&& move[8][2],
				cir528_computer = move[9][0] && move[9][1]&& move[9][2],
				cir693_user     = move[10][0]&& move[10][1]&& move[10][2],
				cir693_computer = move[11][0]&& move[11][1]&& move[11][2],
				cir159_user     = move[12][0]&& move[12][1]&& move[12][2],
				cir159_computer = move[13][0]&& move[13][1]&& move[13][2],
				cir573_user     = move[14][0]&& move[14][1]&& move[14][2],
				cir573_computer = move[15][0]&& move[15][1]&& move[15][2];
			switch (true) {
				case (cir123_user || cir456_user || cir789_user || cir528_user || cir693_user || cir159_user || cir573_user):
					model.winAchi("user");
					break;
				case (cir123_computer || cir456_computer || cir789_computer || cir147_computer || cir528_computer || cir693_computer || cir573_computer):
					model.winAchi("computer");
					break;
			}
		};
		model.computerplay = function() {
			var move = [
				[cir1.hasClass(classUser),cir2.hasClass(classUser),cir1.hasClass(classComputer),cir2.hasClass(classComputer),cir3.hasClass(classPlayed)],
				[cir1.hasClass(classUser),cir3.hasClass(classUser),cir1.hasClass(classComputer),cir3.hasClass(classComputer),cir2.hasClass(classPlayed)],
				[cir3.hasClass(classUser),cir2.hasClass(classUser),cir3.hasClass(classComputer),cir2.hasClass(classComputer),cir1.hasClass(classPlayed)],
				[cir4.hasClass(classUser),cir5.hasClass(classUser),cir4.hasClass(classComputer),cir5.hasClass(classComputer),cir6.hasClass(classPlayed)],
				[cir4.hasClass(classUser),cir6.hasClass(classUser),cir4.hasClass(classComputer),cir6.hasClass(classComputer),cir5.hasClass(classPlayed)],
				[cir5.hasClass(classUser),cir6.hasClass(classUser),cir5.hasClass(classComputer),cir6.hasClass(classComputer),cir4.hasClass(classPlayed)],
				[cir7.hasClass(classUser),cir8.hasClass(classUser),cir7.hasClass(classComputer),cir8.hasClass(classComputer),cir9.hasClass(classPlayed)],
				[cir7.hasClass(classUser),cir9.hasClass(classUser),cir7.hasClass(classComputer),cir9.hasClass(classComputer),cir8.hasClass(classPlayed)],
				[cir8.hasClass(classUser),cir9.hasClass(classUser),cir8.hasClass(classComputer),cir9.hasClass(classComputer),cir7.hasClass(classPlayed)],
				[cir1.hasClass(classUser),cir4.hasClass(classUser),cir1.hasClass(classComputer),cir4.hasClass(classComputer),cir7.hasClass(classPlayed)],
				[cir1.hasClass(classUser),cir7.hasClass(classUser),cir1.hasClass(classComputer),cir7.hasClass(classComputer),cir4.hasClass(classPlayed)],
				[cir4.hasClass(classUser),cir7.hasClass(classUser),cir4.hasClass(classComputer),cir7.hasClass(classComputer),cir1.hasClass(classPlayed)],
				[cir5.hasClass(classUser),cir2.hasClass(classUser),cir5.hasClass(classComputer),cir2.hasClass(classComputer),cir8.hasClass(classPlayed)],
				[cir5.hasClass(classUser),cir8.hasClass(classUser),cir5.hasClass(classComputer),cir8.hasClass(classComputer),cir2.hasClass(classPlayed)],
				[cir2.hasClass(classUser),cir8.hasClass(classUser),cir2.hasClass(classComputer),cir8.hasClass(classComputer),cir5.hasClass(classPlayed)],
				[cir6.hasClass(classUser),cir9.hasClass(classUser),cir6.hasClass(classComputer),cir9.hasClass(classComputer),cir3.hasClass(classPlayed)],
				[cir6.hasClass(classUser),cir3.hasClass(classUser),cir6.hasClass(classComputer),cir3.hasClass(classComputer),cir9.hasClass(classPlayed)],
				[cir9.hasClass(classUser),cir3.hasClass(classUser),cir9.hasClass(classComputer),cir3.hasClass(classComputer),cir6.hasClass(classPlayed)],
				[cir1.hasClass(classUser),cir5.hasClass(classUser),cir1.hasClass(classComputer),cir5.hasClass(classComputer),cir9.hasClass(classPlayed)],
				[cir1.hasClass(classUser),cir9.hasClass(classUser),cir1.hasClass(classComputer),cir9.hasClass(classComputer),cir5.hasClass(classPlayed)],
				[cir5.hasClass(classUser),cir9.hasClass(classUser),cir5.hasClass(classComputer),cir9.hasClass(classComputer),cir1.hasClass(classPlayed)],
				[cir5.hasClass(classUser),cir7.hasClass(classUser),cir5.hasClass(classComputer),cir7.hasClass(classComputer),cir3.hasClass(classPlayed)],
				[cir5.hasClass(classUser),cir3.hasClass(classUser),cir5.hasClass(classComputer),cir3.hasClass(classComputer),cir5.hasClass(classPlayed)],
				[cir7.hasClass(classUser),cir3.hasClass(classUser),cir7.hasClass(classComputer),cir3.hasClass(classComputer),cir7.hasClass(classPlayed)]
			];
		    var win123_cir3 = move[0][0] && move[0][1] || move[0][2] && move[0][3] && !move[0][4],
		        win123_cir2 = move[1][0] && move[1][1] || move[1][2] && move[1][3] && !move[1][4],
		        win123_cir1 = move[2][0] && move[2][1] || move[2][2] && move[2][3] && !move[2][4],
		        win456_cir6 = move[3][0] && move[3][1] || move[3][2] && move[3][3] && !move[3][4],
                win456_cir5 = move[4][0] && move[4][1] || move[4][2] && move[4][3] && !move[4][4],
		        win456_cir4 = move[5][0] && move[5][1] || move[5][2] && move[5][3] && !move[5][4],
		        win789_cir9 = move[6][0] && move[6][1] || move[6][2] && move[6][3] && !move[6][4],
		        win789_cir8 = move[7][0] && move[7][1] || move[7][2] && move[7][3] && !move[7][4],
		        win789_cir7 = move[8][0] && move[8][1] || move[8][2] && move[8][3] && !move[8][4],
		        win147_cir7 = move[9][0] && move[9][1] || move[9][2] && move[9][3] && !move[9][4],
		        win147_cir4 = move[10][0]&& move[10][1]|| move[10][2]&& move[10][3]&& !move[10][4],
		        win147_cir1 = move[11][0]&& move[11][1]|| move[11][2]&& move[11][3]&& !move[11][4],
		        win528_cir8 = move[12][0]&& move[12][1]|| move[12][2]&& move[12][3]&& !move[12][4],
		        win528_cir2 = move[13][0]&& move[13][1]|| move[13][2]&& move[13][3]&& !move[13][4],
		        win528_cir5 = move[14][0]&& move[14][1]|| move[14][2]&& move[14][3]&& !move[14][4],
		        win693_cir3 = move[15][0]&& move[15][1]|| move[15][2]&& move[15][3]&& !move[15][4],
		        win693_cir9 = move[16][0]&& move[16][1]|| move[16][2]&& move[16][3]&& !move[16][4],
		        win693_cir6 = move[17][0]&& move[17][1]|| move[17][2]&& move[17][3]&& !move[17][4],
		        win159_cir9 = move[18][0]&& move[18][1]|| move[18][2]&& move[18][3]&& !move[18][4],
		        win159_cir5 = move[19][0]&& move[19][1]|| move[19][2]&& move[19][3]&& !move[19][4],
		        win159_cir1 = move[20][0]&& move[20][1]|| move[20][2]&& move[20][3]&& !move[20][4],
		        win573_cir3 = move[21][0]&& move[21][1]|| move[21][2]&& move[21][3]&& !move[21][4],
		        win573_cir5 = move[22][0]&& move[22][1]|| move[22][2]&& move[22][3]&& !move[22][4],
		        win573_cir7 = move[23][0]&& move[23][1]|| move[23][2]&& move[23][3]&& !move[23][4];

			switch (true) {
				case (win123_cir1 || win147_cir1 || win159_cir1):
					model.computerplaying(cir1);
					break;
				case (win123_cir2 || win528_cir2 || win528_cir2):
					model.computerplaying(cir2);
					break;
				case (win123_cir3 || win693_cir3 || win573_cir3):
					model.computerplaying(cir3);
					break;
				case (win456_cir4 || win147_cir4):
					model.computerplaying(cir4);
					break;
				case (win456_cir5 || win528_cir5 || win573_cir5):
					model.computerplaying(cir5);
					break;
				case (win456_cir6 || win693_cir6):
					model.computerplaying(cir6);
					break;
				case (win789_cir7 || win147_cir7 || win573_cir7):
					model.computerplaying(cir7);
					break;
				case (win789_cir8 || win528_cir8):
					model.computerplaying(cir8);
					break;
				case (win789_cir9 || win693_cir9 || win159_cir9):
					model.computerplaying(cir9);
					break;
				default:
					model.Orandomplay();
					break;
			}
			model.checkDrawMatch();
			model.checkAchiWin();
		};
		model.Orandomplay = function() {
			for (var i = 0; i < 10; i++) {
				var randomNumber = Math.floor((Math.random() * 9) + 1),
					randomcircle = angular.element(document.getElementById("circle" + randomNumber));
					playValid = model.validatePlay(randomcircle);
				if (playValid) {
					randomcircle.removeClass(classEmptyCircle)
								.addClass(classPlayed)
								.addClass(classComputer);
					break;
				}
			}
		};
		model.computerplaying = function(circle) {
			var playValid = model.validatePlay(circle);
			if (playValid)
				circle.removeClass(classEmptyCircle)
						.addClass(classPlayed)
						.addClass(classComputer);
			else
				model.Orandomplay();
		};
    }
})();
