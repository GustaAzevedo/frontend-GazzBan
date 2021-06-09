import { Tarefa } from 'src/app/model/Tarefa';
import { TarefasService } from './../../services/tarefas.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tarefa: Tarefa;
  tarefas: Tarefa[];
  formVisibility = false;

  isInserir: boolean;
  isSalvar: boolean;

  todo: Tarefa[];

  doing = [
  ]

  done = [
  ];

  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.listarTarefas();
    this.isInserir = true
    this.isSalvar = false;

    this.tarefa = {
      nome: '',
      categoria: '',
      estado: '1'
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  novaTarefa(): void {
    this.tarefasService.inserir(this.tarefa).subscribe(obj => {
      alert('Nova tarefa adicionada com sucesso')
      this.listarTarefas();
    })
    this.limparCampos();

  }

  atualizarTarefa(): void {
    this.tarefasService.update(this.tarefa).subscribe(obj => {
      alert("Tarefa atualizada")
      this.listarTarefas();
    })
    this.limparCampos();
  }

  deleted(id: number) {
    this.tarefasService.delete(id).subscribe(obj => {
      alert("Tarefa excluida com Sucesso!");
      this.listarTarefas();
    })

  }

  listarTarefas(): void {
    this.tarefasService.listar().subscribe(tarefas => {
      this.tarefas = tarefas

      this.todo = this.tarefas;
      console.log(tarefas);
    })
  }

  retornaTarefa(tarefaSalvar: Tarefa) {
    this.ativarForm();
    this.tarefa = tarefaSalvar;
    this.isSalvar = true;
    this.isInserir = false;
  }

  limparCampos(): void {
    this.tarefa = {
      nome: '',
      categoria: '',
      estado: '1'
    }
  }

  came(tarefa: Tarefa) {
    console.log(tarefa)
    this.tarefa = tarefa;
  }

  ativarForm(): void {
    if (this.formVisibility == false) {
      this.formVisibility = true;
    } else {
      this.formVisibility = false;
    }
    this.isInserir = true;
    this.isSalvar = false;
    this.limparCampos();
  }



  arrived(a: string): void {
    console.log(a)
    switch (a) {
      case "todo": {
        this.tarefa.estado = "1";
        this.tarefasService.update(this.tarefa).subscribe(obj => {
          alert("Tarefa atualizada")
          this.listarTarefas();
        })
        this.listarTarefas();
        break;
      }
      case "doing": {
        this.tarefa.estado = "2";
        this.tarefasService.update(this.tarefa).subscribe(obj => {
          alert("Tarefa atualizada")
          this.listarTarefas();
        })
        this.listarTarefas();
        break;
      }
      case "done": {
        this.tarefa.estado = "3";
        this.tarefasService.update(this.tarefa).subscribe(obj => {
          alert("Tarefa atualizada")
          this.listarTarefas();
        })
        this.listarTarefas();
        break;
      }
    }

  }


}
