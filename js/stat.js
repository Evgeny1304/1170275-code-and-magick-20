'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var USER_OWN_NAME = 'Вы';
var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMainCloud = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
};

var renderTitle = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, (CLOUD_Y + GAP) * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, (CLOUD_Y + GAP) * 3);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderBar = function (ctx, player, times, index) {
  var time = times[index];
  var maxTime = getMaxElement(times);
  var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * index;
  var playerNameY = CLOUD_Y + CLOUD_HEIGHT - GAP * 2;
  var barY = CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - (BAR_HEIGHT * time) / maxTime;
  var statsY = CLOUD_Y + CLOUD_HEIGHT - GAP * 5 - (BAR_HEIGHT * time) / maxTime;

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(player, barX, playerNameY);

  if (player === USER_OWN_NAME) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%' + ', ' + Math.random() * 100 + '%' + ')';
  }

  ctx.fillRect(barX, barY, BAR_WIDTH, (BAR_HEIGHT * time) / maxTime);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(Math.round(parseInt(time, 10)), barX, statsY);
};

var renderPlayerStats = function (ctx, players, times) {
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    renderBar(ctx, player, times, i);
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderMainCloud(ctx);
  renderTitle(ctx);
  renderPlayerStats(ctx, players, times);
};
