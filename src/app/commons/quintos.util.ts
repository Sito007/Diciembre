export class QuintosUtil {
    
    public static mostrarMensaje(message: string) {        
        document.getElementById('modal-mensaje').innerHTML = message;
    }

    public static invalid(campo: string) {
        document.getElementById(campo).style.borderColor = 'red';
        //document.getElementById(campo).style.outline =  '0 none';
    }

    public static valid(campo: string) {
        document.getElementById(campo).style.borderColor = '';
        //document.getElementById(campo).style.outline =  '0 none';
    }

}