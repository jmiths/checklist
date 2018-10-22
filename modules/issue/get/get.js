'use strict';
const issue = require('../../../database').issue;
const room = require('../../../database').room;
issue.belongsTo(room, { foreignKey: 'roomcode' });
function get() {
}

get.prototype.get = function(req,res) {
	issue.findAll({
		where: {
			"solved": req.body.solved
		},
		include: [{model:room}]
        })
        .then((issues) => {
                res.status(200).send(issues);
        })
        .catch((error) => {
                res.status(400).send("Failed to get rooms");
        })

};

module.exports = get;
