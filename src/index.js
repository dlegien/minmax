/*import app from './app';

const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
*/

import MinMaxPlayer from './MinMaxPlayer';

var player = new MinMaxPlayer();
player.calculateMoves();
player.calculateMovesFindPath();

console.log(player.endMoves.length);
