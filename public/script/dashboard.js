
function confirmLogout(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/admin/logout';
        }
    });
}


function confirmDelete(userId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This user will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUser(userId);
        }
    });
}


async function deleteUser(userId) {
    try {
        const response = await fetch(`/admin/deleteUser?userId=${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            location.reload();
        } else {
            Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
        }
    } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
    }
}


document.getElementById('table').addEventListener('click', (event) => {
    if (event.target && event.target.matches('.delete-btn')) {
        event.preventDefault();
        const userId = event.target.getAttribute('data-user-id');
        confirmDelete(userId);
    }
});
