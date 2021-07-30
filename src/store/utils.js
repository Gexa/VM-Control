export const getInstanceStatus = (status, code = false) => {
    switch (status.toLowerCase()) {
        default:
        case 'terminated':
            return !code ? 'Megállítva' : 'danger';
        case 'stopping':
            return !code ? 'Leállítás' : 'warning';
        case 'running':
            return !code ? 'Elindítva' : 'success';
    }
}