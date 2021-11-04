const Event = require('../models/Event');

const getEvent = async (req, res) => {
  const events = await Event.find().limit(20).populate('user', 'name');

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with administrator',
    });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found by that id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permission to modify this event',
      });
    }

    const NewEvent = {
      ...req.body,
      user: uid,
    };

    const NewUpdateEvent = await Event.findByIdAndUpdate(eventId, NewEvent, {
      new: true,
    });
    res.json({
      ok: true,
      NewUpdateEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with administrator',
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found by that id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permission to delete this event',
      });
    }

    await Event.findByIdAndDelete(eventId, { new: true });
    res.json({
      ok: true,
      msg: 'event deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with administrator',
    });
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
