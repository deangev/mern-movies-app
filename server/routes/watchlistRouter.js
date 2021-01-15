const router = require('express').Router();
const User = require('../Model/userModel');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        
        res.json(user.watchlist)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/add', async (req, res) => {
    try {
        const { userId, id, poster, rating, title, year } = req.body;

        const MovieExist = await User.exists({ _id: userId, 'watchlist.id': id })
        if (MovieExist) {
            const removeMovie = await User.findByIdAndUpdate(userId, {
                $pull: {
                    watchlist: { id: id }
                }
            })
            return res.json(removeMovie)
        }

        const addMovie = await User.findByIdAndUpdate(userId, {
            $push: {
                watchlist: { 
                    id: id,
                    poster: poster,
                    rating: rating,
                    title: title,
                    year: year
                }
            }
        })
        res.json(addMovie)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;