const mongoose = require(`mongoose`);

const BeerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true
});

BeerSchema.query.drafts = function () {
  return this.where({
    status: 'DRAFT'
  });
};

BeerSchema.query.published = function () {
  return this.where({
    status: 'PUBLISHED'
  });
};

module.exports = mongoose.model('Beer', BeerSchema);