import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['todo', 'in-progress', 'completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'todo'
  },
  // priority: {
  //   type: String,
  //   enum: ['low', 'medium', 'high'],
  //   default: 'medium'
  // },
  // isArchived: {
  //   type: Boolean,
  //   default: false
  // }
}, {
  timestamps: true
})

// ProjectSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 })
ProjectSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })

export default mongoose.model('Project', ProjectSchema)

