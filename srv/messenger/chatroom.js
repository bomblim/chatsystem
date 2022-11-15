const { v4: uuidv4 } = require('uuid');

class Chatroom {

    constructor ( roomType, roomName, ownerId, participants) {
        this.roomId = uuidv4();
        this.roomName = roomName;
        this.roomType = roomType;
        this.ownerId = ownerId;
        participants = participants ? participants : [];
        this.participants = Array.from ( new Set ( participants.concat(ownerId) ));

        this.messages = [];
        this.deleted = false;
    }

    // ROOM

    saveMessage ( sender, message, option) {
        console.log ( sender, message, option);
    }

    deleteRoom ( ) {
        this.deleted = true;
        this.participants = [];
    }

    quitRoom ( userId )
    {
        this.participants = this.participants.filter( v => {
            return v !== userId;
        })

        if ( this.participants.length === 0 )
        {
            this.deleteRoom();
            return;
        }

        if ( this.ownerId === userId )
            this.ownerId = this.participants[0];
    }

}