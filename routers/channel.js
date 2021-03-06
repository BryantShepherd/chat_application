const router = require("express").Router();
const ChannelController = require("../controllers/channel");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const baseRouter = require("./baseRouter");
const auth = require("../passport-config");
const { errorMessage } = require("../config/constants");
const { UniqueViolationError } = require("objection");
const { validateRequiredFields } = require("../lib/validate");

router.use("/", auth.jwtAuth());

router.get("/message", (req, res) => {
  if (!validateRequiredFields(["id"], req.query)) {
    return baseRouter.error(res, 400, "REQUIRED_FIELDS_MISSING");
  }
  const { id: channelId } = req.query;
  ChannelController.getMessageAndSenderInChannel(channelId)
    .then((channelMessages) => {
      return baseRouter.success(res, 200, channelMessages);
    })
    .catch((err) => {
      baseRouter.error(res, 500, err.message);
    });
});

router.get("/message/find", (req, res) => {
  if (!validateRequiredFields(["keyword", "channel_id"], req.query)) {
    return baseRouter.error(res, 400, "REQUIRED_FIELDS_MISSING");
  }
  const { keyword, channel_id } = req.query;

  MessageController.findMessageInChannel({ keyword, channel_id })
    .then((results) => {
      return baseRouter.success(res, 200, results);
    })
    .catch((err) => {
      baseRouter.error(res, 500, err.message);
    });
});

router.get("/member", (req, res) => {
  ChannelController.getChannelMember(req.query.id)
    .then((members) => {
      return baseRouter.success(res, 200, members);
    })
    .catch((err) => {
      baseRouter.error(res, 500);
    });
});

router.get("/get", (req, res) => {
  ChannelController.getAllChannels()
    .then((channels) => {
      return baseRouter.success(res, 200, channels);
    })
    .catch((err) => {
      return baseRouter.error(res, 500);
    });
});

router.post("/add", async (req, res) => {
  if (!validateRequiredFields(["name"], req.body)) {
    return baseRouter.error(res, 400, errorMessage.REQUIRED_FIELDS_MISSING);
  }
  const { name, description } = req.body;
  ChannelController.addChannel({
    name,
    description
  })
    .then((newChannel) => {
      return baseRouter.success(res, 200, newChannel);
    })
    .catch((err) => {
      if (err instanceof UniqueViolationError)
        return baseRouter.error(res, 409, "Channel already exists,");
      return baseRouter.error(res, 500);
    });
});

module.exports = router;
