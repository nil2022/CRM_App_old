
exports.userResponse = (users) => {
    let usersResult = []
    try {
        users.forEach(user => {
            usersResult.push({
                name: user.name,
                userId: user.userId,
                email: user.email,
                userType: user.userType,
                userStatus: user.userStatus
            })
        });
    } catch(err) {
        console.log({
            message : "error in './utils/ojectConverter.js'",
            Error : err.message
        });
    }  
    return usersResult
}

exports.ticketResponse = (ticket) => {
    return {
        title: ticket.title,
        ticketPriority: ticket.ticketPriority,
        description: ticket.description,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    }
}

exports.ticketListResponse = (tickets) => {
    let ticketResult = []
    tickets.forEach(ticket => { 
        return ticketResult.push(exports.ticketResponse(ticket)) 
    })
    return ticketResult
}