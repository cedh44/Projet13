import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Talk from "talkjs";
import {TalkService} from "../../Service/talk.service";

@Component({
  selector: 'app-chat-talkjs',
  templateUrl: './chat-talkjs.component.html',
  styleUrls: ['./chat-talkjs.component.css']
})
export class ChatTalkjsComponent implements OnInit {
  title = 'Your Car Your Way - Support';
  private inbox!: Talk.Inbox;
  private session!: Talk.Session;
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;

  constructor(private talkService: TalkService) {}

  ngOnInit() {
    this.createInbox();
  }

  private async createInbox() {
    const session = await this.talkService.createCurrentSession();
    this.inbox = await this.talkService.createInbox(session);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }
}
