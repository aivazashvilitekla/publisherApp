import { Component, OnInit } from '@angular/core';
// import * as data from '../../data/data.json'
// TODO add in models file
interface Work {
  id: number;
  img: string;
  fullName: string;
  born: string;
  died: string;
  titleName: string;
  writing: Writing;
}
interface Writing {
  id: number;
  title: string;
  year: string;
  text: string;
}
const data = [
  {
    id: 1,
    img: '../../../assets/images/authors/galaktion.jpg',
    fullName: 'გალაკტიონ ტაბიძე',
    born: 'დ. 17 ნოემბერი, 1892',
    died: 'მ. 17 მარტი, 1959',
    titleName: 'პოეტი',
    writing: [
      {
        id: 101,
        title: 'ლურჯა ცხენები',
        year: '1915წ.',
        text: `
        როგორც ნისლის ნამქერი, ჩამავალ მზით ნაფერი,
        ელვარებდა ნაპირი სამუდამო მხარეში!
        არ სჩანდა შენაპირი, ვერ ვნახე ვერაფერი,
        ცივ და მიუსაფარი მდუმარების გარეშე.
        
        მდუმარების გარეშე და სიცივის თარეშში,
        სამუდამო მხარეში მხოლოდ სიმწუხარეა!
        ცეცხლი არ კრთის თვალებში, წევხარ ცივ სამარეში,
        წევხარ ცივ სამარეში და არც სულს უხარია.
        
        შეშლილი სახეების ჩონჩხიანი ტყეებით
        უსულდგმულო დღეები რბიან, მიიჩქარიან!
        სიზმარიან ჩვენებით - ჩემი ლურჯა ცხენებით
        ჩემთან მოესვენებით! ყველანი აქ არიან!
        
        იჩქარიან წამები, მე კი არ მენანება:
        ცრემლით არ ინამება სამუდამო ბალიში;
        გაქრა ვნება-წამება - როგორც ღამის ზმანება,
        ვით სულის ხმოვანება ლოცვის სიმხურვალეში.
        
        ვით ცეცხლის ხეტიალი, როგორც ბედის ტრიალი,
        ჩქარი გრგვინვა-გრიალით ქრიან ლურჯა ცხენები!
        ყვავილნი არ არიან, არც შვება-სიზმარია!
        ეხლა კი სამარეა შენი განსასვენები!
        
        რომელი სცნობს შენს სახეს, ან ვინ იტყვის შენს სახელს?
        ვინ გაიგებს შენს ძახილს, ძახილს ვინ დაიჯერებს?
        ვერავინ განუგეშებს საოცრების უბეში,
        სძინავთ ბნელ ხვეულებში გამოუცნობ ქიმერებს!
        
        მხოლოდ შუქთა კამარა ვერაფერმა დაფარა:
        მშრალ რიცხვების ამარა უდაბნოში ღელდება!
        შეშლილი სახეების ჩონჩხიანი ტყეებით
        უსულდგმულო დღეები ჩნდება და ქვესკნელდება.
        
        მხოლოდ ნისლის თარეშში, სამუდამო მხარეში,
        ზევით თუ სამარეში, წყევლით შენაჩვენები,
        როგორც ზღვის ხეტიალი, როგორც ბედის ტრიალი,
        ჩქარი გრგვინვა-გრიალით ქრიან ლურჯა ცხენები!`,
      },
    ],
  },
];
@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
  selectedWork: Work | undefined;
  loading = true;

  constructor() {
    
  }

  ngOnInit() {
    this.pickWork();
    console.log(this.selectedWork);
  }

  pickWork() {
    // const randomAuthorId = Math.floor(Math.random() * (100 - 1) + 1);
    // const randomWorkId = Math.floor(Math.random() * (200 - 101) + 101);
    const randomAuthorId = 1;
    const randomWorkId = 101;
    const foundAuthor: any = data.find(item => item.id === randomAuthorId)
    const foundWriting: any = foundAuthor.writing.find((item: any) => item.id === randomWorkId);
    this.selectedWork = {
      ...foundAuthor,
      writing: foundWriting
    }
    
  }
}
