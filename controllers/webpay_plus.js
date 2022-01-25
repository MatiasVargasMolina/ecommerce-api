const WebpayPlus = require("transbank-sdk").WebpayPlus;
const asyncHandler = require("../utils/async_handler");

exports.create = asyncHandler(async function (request, response, next) {
  let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  let amount = request.body.amount;
  let returnUrl = "http://localhost:3000/succes"
    //request.protocol + "://" + request.get("host") + "/commit";

  const createResponse = await WebpayPlus.Transaction.create(
    buyOrder,
    sessionId,
    amount,
    returnUrlcd
  );

  let token = createResponse.token;
  let url = createResponse.url;

  let viewData = {
    buyOrder,
    sessionId,
    amount,
    returnUrl,
    token,
    url,
  };
  response.json({
    token: token,
    url: url,
    returnUrl: viewData.returnUrl
  });
});

exports.commit = asyncHandler(async function (request, response, next) {
  let token = request.body.token_ws;

  const commitResponse = await WebpayPlus.Transaction.commit(token);

  let viewData = {
    token,
    commitResponse,
  };
  response.redirect("http://localhost:3000/Succes")
});

exports.status = asyncHandler(async function (request, response, next) {
  let token = request.body.token;

  const statusResponse = await WebpayPlus.Transaction.status(token);

  let viewData = {
    token,
    statusResponse,
  };

  response.render("webpay_plus/status", {
    step: "Estado de Transacción",
    stepDescription:
      "Puedes solicitar el estado de una transacción hasta 7 días despues de que haya sido" +
      " realizada. No hay limite de solicitudes de este tipo, sin embargo, una vez pasados los " +
      "7 días ya no podrás revisar su estado.",
    viewData,
  });
});

exports.refund = asyncHandler(async function (request, response, next) {
  let { token, amount } = request.body;

  const refundResponse = await WebpayPlus.Transaction.refund(token, amount);

  let viewData = {
    token,
    amount,
    refundResponse,
  };

  response.render("webpay_plus/refund", {
    step: "Reembolso de Transacción",
    stepDescription:
      "Podrás pedir el reembolso del dinero al tarjeta habiente, dependiendo del monto " +
      "y el tiempo transacurrido será una Reversa, Anulación o Anulación parcial.",
    viewData,
  });
});
