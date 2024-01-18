
const bcrypt = require('bcrypt');
const { User, TopicModel } = require('../models/FormData.js');
const serialize = require('serialize-javascript');

const {data,version} = require("../../src/450DSAFinal.js");
// const { version } = require("../../src/450DSAFinal.js");


const addAcc = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return res.status(200).json({ success: false, message: 'User already exists. Please log in.' });
      }
  
      // If the email doesn't exist, proceed with signup
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error creating user' });
    }
  };

  const checkAcc = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email }).exec();
  
      if (existingUser) {
        // const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        
        // Check if the provided password matches the stored password
        if (existingUser.password === password) {
          res.status(200).json({ success: true, message: 'Login successful', user: existingUser });
        } else {
          res.status(200).json({ success: false, message: 'Incorrect password' });
        }
      } else {
        res.status(200).json({ success: false, message: 'Email not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error checking login credentials' });
    }
  };


  async function insertData(callback) {
    try {
      const formattedData = data.map((topic, index) => ({
        topicName: topic.topicName,
        position: index,
        started: topic.started,
        doneQuestions: topic.doneQuestions,
        questions: topic.questions.map((question) => ({
          Topic: question.Topic,
          Problem: question.Problem,
          Done: question.Done,
          Bookmark: question.Bookmark,
          Notes: question.Notes,
          URL: question.URL,
        })),
      }));
  
      await TopicModel.insertMany(formattedData);
      await getData(callback);  // Use await to make sure getData completes before moving on
    } catch (error) {
      console.error('Error inserting data:', error);
      throw error;
    }
  }
  
  

  async function getData(req, res) {
    try {
      const data = await TopicModel.find().sort({ position: 1 });
      if (data.length === 0) {
        await insertData();
        res.status(200).json({ success: true, data });
      } else {
        res.status(200).json({ success: true, data });
      }
    } catch (error) {
      console.error('Error getting data:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
  
  async function updateData(key) {
    const { topicData, topicPosition, rowId } = key.body;
    const id = topicData.questions[rowId]._id;
  
    try {
      const updatedTopic = await TopicModel.findOneAndUpdate(
        { position: topicPosition, "questions._id": id },
        {
          $set: {
            "questions.$.Done": topicData.questions[rowId].Done,
            "questions.$.Notes": topicData.questions[rowId].Notes,
          },
        },
        { new: true }
      );
  
      // Recalculate doneQuestions and started based on the updatedTopic
      const doneQuestionsCount = updatedTopic.questions.filter(question => question.Done).length;
      const startedStatus = doneQuestionsCount > 0;
  
      // Update the topic's doneQuestions and started fields
      await TopicModel.updateOne(
        { position: topicPosition },
        { doneQuestions: doneQuestionsCount, started: startedStatus }
      );
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }
  
  

async function resetData() {
  try {
    await TopicModel.deleteMany({});
  } catch (error) {
    console.error('Error resetting data:', error);
    throw error;
  }
}

async function exportData(callback) {
  try {
    const data = await TopicModel.find();
    callback(data);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
}

async function importData(data, callback) {
  try {
    await resetData();
    await TopicModel.insertMany(data);
    getData(callback);
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
}
const getTopicData = async (req, res) => {
  try {
    const { key } = req.params; // Assuming the topic name or identifier is in the URL parameter

    // Retrieve data for the specified topic
    const topicData = await TopicModel.findOne({ topicName: key }).exec();

    if (!topicData) {
      // Handle case where topic data is not found
      res.status(404).json({ success: false, message: 'Topic not found' });
      return;
    }

    // Send the topic data in the response
    res.status(200).json({ success: true, data: topicData });
  } catch (error) {
    console.error('Error getting topic data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
  insertData,
  getData,
  updateData,
  resetData,
  exportData,
  importData,
  addAcc,
  checkAcc,
  getTopicData,
};


