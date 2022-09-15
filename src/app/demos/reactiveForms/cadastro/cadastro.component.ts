import { Usuario } from './models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS,NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {

  cadastroForm : FormGroup;
  usuario : Usuario;
  formResult: string = '';
  MASKS = MASKS; // instanciando a máscara para ser utilizada no componente

  // Injetando a instância do FormBuilder dentro do construtor.
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    // Forma utilizada para comparar se a senhaConfirmacao é igual a senha:
    // Para isso, vamos precisar fazer essa validação em um formControl separado.
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]); // CustomValidators sendo utilizado para determinar que a senha deve ter de 6 à 15 caracteres.
    let senhaConfirmacao = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senha)]);


    // O FormBuilder é uma espécie de API que gerencia formulários dentro do Angular.
    // Dentro dele vamos encontrar alguns métodos. A princípio vamos trabalhar com o group()
    this.cadastroForm = this.fb.group ({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]], // significa que esse campo é obrigatório, mínimo 2 letras e máximo 150 letras.
      cpf: ['',[Validators.required, NgBrazilValidators.cpf]], // o próprio NgBrazil já se encarrega de validar o CPF
      email: ['',[Validators.required, Validators.email]], // como o campo e-mail vai conter duas validações, elas devem ficar dentro de outro array
      senha: senha,
      senhaConfirmacao: senhaConfirmacao,
    });
  }

  adicionarUsuario() {
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      // Transformando os dados do formulário para o objeto de Usuario.
      // O método assign() é responsável por atribuir o mapeamento entre um obejto e outro.
      // Dentro dele nós temos o target e o source.
      // target: onde eu quero que os dados sejam armazenados.
      // source: fonte da informação.
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      // transformando o resultado em string do tipo JSON
      this.formResult = JSON.stringify(this.cadastroForm.value);
      console.log(this.usuario);
    }
    else{
      this.formResult = "Não submeteu!!!"
    }
  }

}
