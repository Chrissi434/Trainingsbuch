{
/* ================= Stammdaten ================= */
const MUS=[
 {id:'chest',n:'Brust',t:10},{id:'shoulders',n:'Schultern',t:8},{id:'reardelt',n:'Hintere Schulter',t:6},
 {id:'biceps',n:'Bizeps',t:6},{id:'triceps',n:'Trizeps',t:6},{id:'forearms',n:'Unterarme',t:4},
 {id:'abs',n:'Bauch',t:6},{id:'obliques',n:'Seitliche Bauchmuskeln',t:4},{id:'traps',n:'Nacken (Trapez)',t:5},
 {id:'lats',n:'Rücken (Latissimus)',t:10},{id:'lowerback',n:'Unterer Rücken',t:4},{id:'glutes',n:'Gesäß',t:8},
 {id:'quads',n:'Oberschenkel vorne',t:10},{id:'hamstrings',n:'Oberschenkel hinten',t:8},{id:'adductors',n:'Adduktoren',t:4},{id:'calves',n:'Waden',t:6}];
const MN=Object.fromEntries(MUS.map(m=>[m.id,m.n]));
const EQ={maschine:'Maschine',frei:'Freie Gewichte',kabel:'Kabelzug',koerper:'Körpergewicht',cardio:'Cardio-Gerät'};
const EX=[
 {id:'bankdruecken',n:'Bankdrücken (Langhantel)',eq:'frei',p:['chest'],s:['triceps','shoulders'],c:1,set:'Flach auf die Bank, Augen unter der Stange. Füße fest am Boden, Schulterblätter zusammen- und nach unten ziehen.',how:'Etwas weiter als schulterbreit greifen, Stange kontrolliert zur unteren Brust senken, Ellbogen etwa 45° vom Körper, dann kraftvoll hochdrücken.',tip:'Schwere Sätze nur mit Sicherungsablage oder Partner. Der Po bleibt auf der Bank.'},
 {id:'kh-schraegbank',n:'Schrägbankdrücken (Kurzhantel)',eq:'frei',p:['chest'],s:['shoulders','triceps'],c:1,set:'Bank auf 30–45° stellen. Hanteln auf den Oberschenkeln aufnehmen und beim Zurücklehnen auf Brusthöhe bringen.',how:'Hanteln über der oberen Brust zusammenführen, langsam seitlich der Brust absenken, bis die Oberarme etwa waagerecht sind.',tip:'Steiler als 45° verlagert die Arbeit stark in die Schultern.'},
 {id:'brustpresse',n:'Brustpresse',eq:'maschine',p:['chest'],s:['triceps','shoulders'],c:1,set:'Sitzhöhe so einstellen, dass die Griffe auf Höhe der mittleren Brust liegen. Rücken an die Lehne.',how:'Griffe nach vorne drücken, ohne die Ellbogen ganz durchzustrecken, und langsam zurückführen, bis du eine Dehnung in der Brust spürst.',tip:'Schultern bleiben unten und hinten – nicht nach vorne rollen lassen.'},
 {id:'butterfly',n:'Butterfly',eq:'maschine',p:['chest'],s:[],set:'Sitz so einstellen, dass die Griffe auf Brusthöhe sind. Arme leicht gebeugt.',how:'Arme in einem weiten Bogen vor der Brust zusammenführen, kurz halten, langsam öffnen.',tip:'Der Ellbogenwinkel bleibt die ganze Bewegung über gleich.'},
 {id:'kabel-crossover',n:'Kabel-Crossover',eq:'kabel',p:['chest'],s:['shoulders'],set:'Beide Rollen oben einstellen, mittig zwischen den Türmen in leichter Schrittstellung stehen.',how:'Griffe in einem Bogen nach unten-vorne vor dem Bauch zusammenführen, kontrolliert zurück.',tip:'Rollen unten einstellen und nach oben ziehen trifft die obere Brust stärker.'},
 {id:'liegestuetz',n:'Liegestütz',eq:'koerper',p:['chest'],s:['triceps','shoulders','abs'],c:1,set:'Hände etwas weiter als schulterbreit, Körper von Kopf bis Ferse in einer Linie.',how:'Brust bis kurz über den Boden senken, dann hochdrücken. Ellbogen etwa 45° vom Körper.',tip:'Zu schwer? Hände auf eine Bank stellen. Zu leicht? Füße erhöhen.'},
 {id:'dips',n:'Dips',eq:'koerper',p:['triceps','chest'],s:['shoulders'],c:1,set:'Am Barren oder an der Dip-Maschine (mit Gegengewicht) Stütz einnehmen.',how:'Kontrolliert absenken, bis die Oberarme etwa waagerecht sind, dann hochdrücken.',tip:'Oberkörper aufrecht betont den Trizeps, nach vorne geneigt die Brust. Bei Schulterschmerzen weglassen.'},
 {id:'schulterpresse',n:'Schulterpresse',eq:'maschine',p:['shoulders'],s:['triceps'],c:1,set:'Sitz so einstellen, dass die Griffe auf Schulterhöhe starten. Rücken fest an der Lehne.',how:'Griffe nach oben drücken, ohne die Arme ganz durchzustrecken, langsam auf Schulterhöhe zurück.',tip:'Kein Hohlkreuz – Bauch leicht anspannen.'},
 {id:'kh-schulterdruecken',n:'Schulterdrücken (Kurzhantel)',eq:'frei',p:['shoulders'],s:['triceps'],c:1,set:'Bank fast senkrecht stellen, Hanteln auf Schulterhöhe, Handflächen nach vorne.',how:'Hanteln über dem Kopf zusammendrücken, kontrolliert auf Ohrhöhe absenken.',tip:'Ellbogen leicht vor dem Körper halten, nicht ganz seitlich.'},
 {id:'seitheben',n:'Seitheben (Kurzhantel)',eq:'frei',p:['shoulders'],s:['traps'],set:'Aufrecht stehen, Hanteln seitlich am Körper, Arme leicht gebeugt.',how:'Arme seitlich bis Schulterhöhe heben, als würdest du Wasser ausgießen, langsam absenken.',tip:'Leichtes Gewicht, sauber und ohne Schwung – die seitliche Schulter ist ein kleiner Muskel.'},
 {id:'kabel-seitheben',n:'Seitheben am Kabel',eq:'kabel',p:['shoulders'],s:[],set:'Rolle ganz unten, seitlich zum Turm stehen, Griff mit der turmfernen Hand.',how:'Arm seitlich bis Schulterhöhe führen und kontrolliert ablassen.',tip:'Das Kabel hält die Spannung auch unten – gut für die letzten Sätze.'},
 {id:'reverse-butterfly',n:'Reverse Butterfly',eq:'maschine',p:['reardelt'],s:['traps'],set:'Mit der Brust zum Polster sitzen, Griffe auf Schulterhöhe, Arme leicht gebeugt.',how:'Arme in einem weiten Bogen nach hinten führen, Schulterblätter am Ende zusammenziehen.',tip:'Langsam und ohne Schwung – Ziel ist die hintere Schulter, nicht der Nacken.'},
 {id:'facepulls',n:'Face Pulls',eq:'kabel',p:['reardelt'],s:['traps'],set:'Seilgriff am Kabelturm auf Stirnhöhe einhängen.',how:'Seil Richtung Gesicht ziehen, Hände dabei nach außen auseinanderziehen, Ellbogen hoch.',tip:'Sehr gut für die Haltung und als Ausgleich zum Drücken.'},
 {id:'latzug',n:'Latzug',eq:'maschine',p:['lats'],s:['biceps','reardelt'],c:1,set:'Knie unter das Polster klemmen, Stange etwas weiter als schulterbreit greifen.',how:'Stange zur oberen Brust ziehen, Brust raus, Ellbogen nach unten-hinten. Langsam nach oben zurück.',tip:'Nicht weit nach hinten lehnen und nicht in den Nacken ziehen.'},
 {id:'klimmzug',n:'Klimmzüge',eq:'koerper',p:['lats'],s:['biceps','forearms'],c:1,set:'Schulterbreit oder etwas weiter an die Stange hängen. Für Unterstützung Gegengewichtsmaschine oder Band nutzen.',how:'Aus dem Hang Schulterblätter nach unten ziehen, Kinn über die Stange, kontrolliert ablassen.',tip:'Volle Bewegung ist wichtiger als viele halbe Wiederholungen.'},
 {id:'rudern-maschine',n:'Rudermaschine (sitzend)',eq:'maschine',p:['lats','traps'],s:['biceps','reardelt'],c:1,set:'Brustpolster so einstellen, dass du die Griffe mit gestreckten Armen gerade erreichst.',how:'Griffe zum Körper ziehen, Schulterblätter zusammen, Ellbogen nah am Körper. Langsam nach vorne.',tip:'Brust bleibt am Polster, kein Schwung aus dem Rücken.'},
 {id:'kabelrudern',n:'Kabelrudern (eng)',eq:'kabel',p:['lats','traps'],s:['biceps'],c:1,set:'Am tiefen Kabelzug sitzen, Füße an die Platten, Knie leicht gebeugt, V-Griff.',how:'Griff zum Bauchnabel ziehen, aufrecht bleiben, Schulterblätter zusammen, kontrolliert zurück.',tip:'Der Oberkörper bewegt sich kaum – die Arbeit machen Rücken und Arme.'},
 {id:'lh-rudern',n:'Langhantelrudern (vorgebeugt)',eq:'frei',p:['lats','traps'],s:['biceps','lowerback','reardelt'],c:1,set:'Hüftbreit stehen, Hüfte nach hinten schieben, bis der Oberkörper etwa 45° nach vorne geneigt ist. Rücken gerade.',how:'Stange zum Bauchnabel ziehen, kurz halten, kontrolliert absenken.',tip:'Rücken bleibt die ganze Zeit neutral – bei Rückenproblemen lieber Maschine oder Kabel.'},
 {id:'kh-rudern',n:'Einarmiges Kurzhantelrudern',eq:'frei',p:['lats'],s:['biceps','traps'],c:1,set:'Ein Knie und eine Hand auf der Bank abstützen, Rücken waagerecht.',how:'Hantel Richtung Hüfte ziehen, Ellbogen nah am Körper, langsam ablassen.',tip:'Ziehen in Richtung Hüfte trifft den Latissimus besser als zur Schulter.'},
 {id:'straight-arm',n:'Überzüge am Kabel (Straight-Arm Pulldown)',eq:'kabel',p:['lats'],s:[],set:'Stange oder Seil am oberen Kabel, Schritt zurück, leicht vorgebeugt.',how:'Mit fast gestreckten Armen die Stange im Bogen bis zu den Oberschenkeln drücken.',tip:'Isoliert den Latissimus – gut, wenn die Arme beim Rudern zuerst ermüden.'},
 {id:'shrugs',n:'Schulterheben (Shrugs)',eq:'frei',p:['traps'],s:['forearms'],set:'Aufrecht stehen, Kurzhanteln seitlich am Körper.',how:'Schultern gerade nach oben Richtung Ohren ziehen, kurz halten, absenken.',tip:'Nicht kreisen – nur hoch und runter.'},
 {id:'rueckenstrecker',n:'Rückenstrecker (Hyperextension)',eq:'maschine',p:['lowerback'],s:['glutes','hamstrings'],set:'Polster knapp unter dem Hüftknochen einstellen, Fersen eingehakt.',how:'Oberkörper langsam nach vorne absenken, dann bis zur geraden Linie aufrichten – nicht überstrecken.',tip:'Arme vor der Brust verschränken; später Gewichtsscheibe halten.'},
 {id:'kreuzheben',n:'Kreuzheben',eq:'frei',p:['lowerback','glutes','hamstrings'],s:['quads','traps','forearms'],c:1,set:'Mittelfuß unter der Stange, hüftbreit stehen, schulterbreit greifen, Hüfte runter, Brust raus, Rücken gerade.',how:'Stange nah am Körper hochziehen, indem du Hüfte und Knie gleichzeitig streckst. Kontrolliert ablegen.',tip:'Technik zuerst mit leichtem Gewicht lernen – am besten mit Trainerin oder Trainer.'},
 {id:'lh-curls',n:'Langhantel-Curls',eq:'frei',p:['biceps'],s:['forearms'],set:'Aufrecht stehen, schulterbreiter Untergriff.',how:'Stange durch Beugen der Ellbogen zur Brust führen, langsam absenken.',tip:'Ellbogen bleiben seitlich am Körper, kein Schwung aus dem Rücken.'},
 {id:'hammercurls',n:'Hammercurls (Kurzhantel)',eq:'frei',p:['biceps','forearms'],s:[],set:'Kurzhanteln seitlich, Handflächen zeigen zueinander.',how:'Hanteln mit neutralem Griff zur Schulter führen, langsam ablassen.',tip:'Trainiert zusätzlich Unterarm und Armbeuger – gut für Bouldern.'},
 {id:'bizepsmaschine',n:'Bizepsmaschine',eq:'maschine',p:['biceps'],s:[],set:'Sitz so einstellen, dass die Ellbogen auf Höhe der Drehachse aufliegen.',how:'Griffe zu den Schultern beugen, langsam fast ganz strecken.',tip:'Ganz unten nicht ablegen, Spannung halten.'},
 {id:'trizepsdruecken',n:'Trizepsdrücken am Kabel',eq:'kabel',p:['triceps'],s:[],set:'Seil oder Stange am oberen Kabel, aufrecht vor dem Turm.',how:'Ellbogen am Körper fixieren, Griff nach unten drücken bis die Arme gestreckt sind, langsam zurück.',tip:'Nur die Unterarme bewegen sich.'},
 {id:'french-press',n:'French Press (Stirndrücken)',eq:'frei',p:['triceps'],s:[],set:'Auf der Flachbank liegen, SZ-Stange oder Kurzhanteln mit gestreckten Armen über der Brust.',how:'Nur die Ellbogen beugen und die Stange Richtung Stirn senken, dann wieder strecken.',tip:'Ellbogen zeigen zur Decke und wandern nicht nach außen.'},
 {id:'trizepsmaschine',n:'Trizepsmaschine',eq:'maschine',p:['triceps'],s:[],set:'Sitz so einstellen, dass die Ellbogen auf dem Polster liegen und mit der Drehachse fluchten.',how:'Griffe nach unten strecken, langsam zurück.',tip:'Gute Alternative, wenn Dips den Schultern nicht gut tun.'},
 {id:'ueberkopf-trizeps',n:'Überkopf-Trizepsstrecken (Kabel)',eq:'kabel',p:['triceps'],s:[],set:'Seil am unteren Kabel, mit dem Rücken zum Turm, Seil hinter dem Kopf.',how:'Arme nach oben-vorne strecken, Ellbogen bleiben neben dem Kopf, langsam zurück.',tip:'Trifft den langen Trizepskopf durch die Dehnung besonders gut.'},
 {id:'handgelenk-curls',n:'Handgelenk-Curls',eq:'frei',p:['forearms'],s:[],set:'Unterarme auf den Oberschenkeln oder einer Bank, Handgelenke hängen über die Kante.',how:'Hantel nur aus dem Handgelenk nach oben rollen und senken.',tip:'Leichtes Gewicht, viele Wiederholungen.'},
 {id:'farmers-walk',n:'Farmer’s Walk',eq:'frei',p:['forearms','traps'],s:['abs','glutes'],c:1,set:'Zwei schwere Kurzhanteln oder Kettlebells seitlich aufnehmen.',how:'Aufrecht mit festem Griff 20–40 Meter gehen, abstellen, wiederholen.',tip:'Stärkt Griffkraft und Rumpf – passt gut zum Bouldern.'},
 {id:'kniebeuge',n:'Kniebeuge (Langhantel)',eq:'frei',p:['quads','glutes'],s:['adductors','lowerback','hamstrings'],c:1,set:'Stange im Rack auf den oberen Rücken, schulterbreit stehen, Fußspitzen leicht nach außen.',how:'Hüfte nach hinten-unten setzen, bis die Oberschenkel mindestens waagerecht sind, Knie folgen den Fußspitzen. Kraftvoll aufstehen.',tip:'Sicherungsstangen im Rack auf passende Höhe stellen. Fersen bleiben am Boden.'},
 {id:'beinpresse',n:'Beinpresse',eq:'maschine',p:['quads','glutes'],s:['adductors','hamstrings'],c:1,set:'Rücken fest an der Lehne, Füße schulterbreit mittig auf der Platte.',how:'Schlitten absenken, bis die Knie etwa 90° gebeugt sind, dann wegdrücken, ohne die Knie ganz durchzustrecken.',tip:'Höhere Fußposition betont Gesäß und Beinbeuger, tiefere den vorderen Oberschenkel.'},
 {id:'beinstrecker',n:'Beinstrecker',eq:'maschine',p:['quads'],s:[],set:'Rückenlehne so einstellen, dass die Knie mit der Drehachse fluchten. Fußpolster knapp über dem Sprunggelenk.',how:'Beine vollständig strecken, kurz halten, langsam absenken.',tip:'Bei Knieproblemen mit leichtem Gewicht und kleinerem Bewegungsumfang starten.'},
 {id:'beinbeuger',n:'Beinbeuger (liegend oder sitzend)',eq:'maschine',p:['hamstrings'],s:['calves'],set:'Knie auf Höhe der Drehachse, Polster knapp über der Ferse.',how:'Fersen Richtung Gesäß beugen, kurz halten, langsam strecken.',tip:'Die Hüfte bleibt am Polster und hebt nicht ab.'},
 {id:'rum-kreuzheben',n:'Rumänisches Kreuzheben',eq:'frei',p:['hamstrings','glutes'],s:['lowerback'],c:1,set:'Hüftbreit stehen, Lang- oder Kurzhanteln vor den Oberschenkeln, Knie leicht gebeugt.',how:'Hüfte nach hinten schieben, Gewicht nah an den Beinen bis unter die Knie senken, Rücken gerade. Hüfte nach vorne strecken.',tip:'Du solltest eine deutliche Dehnung hinten im Oberschenkel spüren.'},
 {id:'ausfallschritte',n:'Ausfallschritte (Kurzhantel)',eq:'frei',p:['quads','glutes'],s:['adductors','hamstrings'],c:1,set:'Aufrecht stehen, Kurzhanteln seitlich.',how:'Großen Schritt nach vorne, hinteres Knie Richtung Boden senken, über das vordere Bein zurückdrücken.',tip:'Das vordere Knie bleibt über dem Fuß und knickt nicht nach innen.'},
 {id:'bulgarian',n:'Bulgarische Split Squats',eq:'frei',p:['quads','glutes'],s:['adductors'],c:1,set:'Hinteren Fußrücken auf eine Bank legen, vorderer Fuß gut einen Schritt vor der Bank.',how:'Senkrecht nach unten absenken, bis der vordere Oberschenkel waagerecht ist, hochdrücken.',tip:'Erst ohne Gewicht üben – Gleichgewicht ist anfangs die größte Hürde.'},
 {id:'hip-thrust',n:'Hip Thrust',eq:'frei',p:['glutes'],s:['hamstrings'],c:1,set:'Oberer Rücken an der Bankkante, Langhantel mit Polster über der Hüfte, Füße hüftbreit.',how:'Hüfte nach oben strecken, bis der Körper von Schulter bis Knie eine Linie bildet, Po anspannen, absenken.',tip:'Kinn zur Brust, Blick nach vorne – so bleibt das Becken neutral.'},
 {id:'abduktoren',n:'Abduktorenmaschine',eq:'maschine',p:['glutes'],s:[],set:'Aufrecht sitzen, Polster außen an den Knien.',how:'Beine gegen den Widerstand auseinanderdrücken, langsam zurück.',tip:'Trainiert den seitlichen Gesäßmuskel – wichtig für stabile Knie beim Wandern und Laufen.'},
 {id:'adduktoren',n:'Adduktorenmaschine',eq:'maschine',p:['adductors'],s:[],set:'Aufrecht sitzen, Polster innen an den Knien, Startweite so wählen, dass es angenehm dehnt.',how:'Beine gegen den Widerstand zusammendrücken, langsam öffnen.',tip:'Mit kleiner Startweite beginnen und langsam steigern.'},
 {id:'wadenheben-stehend',n:'Wadenheben stehend',eq:'maschine',p:['calves'],s:[],set:'Schulterpolster einstellen, Fußballen auf der Kante, Fersen frei.',how:'Fersen so tief wie möglich absenken, dann maximal hochdrücken, oben kurz halten.',tip:'Volle Bewegung und eine Pause unten bringen mehr als viel Gewicht.'},
 {id:'wadenheben-sitzend',n:'Wadenheben sitzend',eq:'maschine',p:['calves'],s:[],set:'Polster auf die Oberschenkel knapp über den Knien, Fußballen auf der Stufe.',how:'Fersen absenken und hochdrücken.',tip:'Mit gebeugtem Knie wird vor allem der tiefe Wadenmuskel (Soleus) trainiert.'},
 {id:'goblet-squat',n:'Goblet Squat',eq:'frei',p:['quads','glutes'],s:['adductors','abs'],c:1,set:'Kurzhantel oder Kettlebell senkrecht vor der Brust halten, etwas weiter als hüftbreit stehen.',how:'Tief zwischen die Knie absenken, Oberkörper aufrecht, wieder aufstehen.',tip:'Ideal, um die Kniebeuge zu lernen.'},
 {id:'bauchmaschine',n:'Bauchmaschine (Crunch)',eq:'maschine',p:['abs'],s:[],set:'Sitz so einstellen, dass die Polster auf der Brust oder den Schultern liegen.',how:'Oberkörper einrollen, als würdest du die Rippen zum Becken ziehen, langsam zurück.',tip:'Ausatmen beim Einrollen.'},
 {id:'plank',n:'Unterarmstütz (Plank)',eq:'koerper',p:['abs'],s:['obliques','shoulders'],set:'Unterarme schulterbreit, Ellbogen unter den Schultern, Körper gerade.',how:'Position 20–60 Sekunden halten, Bauch und Po anspannen. Bei Wdh. die Sekunden eintragen.',tip:'Die Hüfte sackt nicht durch und ragt nicht nach oben.'},
 {id:'beinheben',n:'Hängendes Beinheben',eq:'koerper',p:['abs'],s:['obliques','forearms'],set:'An einer Klimmzugstange hängen oder im Beinheben-Stuhl abstützen.',how:'Knie oder gestreckte Beine nach oben ziehen und das Becken einrollen, langsam ablassen.',tip:'Nicht schwingen – Pendeln nimmt den Bauch aus der Übung.'},
 {id:'holzhacker',n:'Holzhacker am Kabel',eq:'kabel',p:['obliques'],s:['abs','shoulders'],set:'Seitlich zum Kabelturm, Rolle oben, Griff mit beiden Händen.',how:'Griff diagonal nach unten zur gegenüberliegenden Hüfte ziehen, aus dem Rumpf drehen, kontrolliert zurück.',tip:'Die Arme bleiben fast gestreckt, die Bewegung kommt aus dem Rumpf.'},
 {id:'seitstuetz',n:'Seitstütz',eq:'koerper',p:['obliques'],s:['abs'],set:'Seitlich auf einen Unterarm stützen, Füße übereinander.',how:'Hüfte anheben, bis der Körper eine Linie bildet, halten. Seite wechseln.',tip:'Bei Wdh. die gehaltenen Sekunden eintragen.'},
 {id:'laufband',n:'Laufband',eq:'cardio',p:['quads','calves'],s:['hamstrings','glutes'],set:'Notaus-Clip an der Kleidung befestigen, mit niedriger Geschwindigkeit starten.',how:'Zügig gehen oder locker laufen. Steigung 5–10 % beim Gehen macht es zu einem gelenkschonenden Bergtraining.',tip:'Nicht am Geländer festhalten – das verfälscht Haltung und Belastung.'},
 {id:'crosstrainer',n:'Crosstrainer',eq:'cardio',p:['quads','glutes'],s:['shoulders','lats','calves'],set:'Auf die Pedale steigen, Griffe fassen, Widerstandsstufe wählen.',how:'Gleichmäßige, runde Bewegung, Arme schieben und ziehen aktiv mit.',tip:'Sehr gelenkschonend – gut zum Aufwärmen oder für Ausdauer.'},
 {id:'rudergeraet',n:'Rudergerät',eq:'cardio',p:['lats','quads'],s:['biceps','hamstrings','glutes','abs'],set:'Füße in den Schlaufen festziehen, Griff locker fassen.',how:'Erst Beine strecken, dann Oberkörper leicht zurück, dann Arme ziehen. Zurück in umgekehrter Reihenfolge.',tip:'Rund 60 % der Kraft kommen aus den Beinen, nicht aus den Armen.'},
 {id:'fahrradergometer',n:'Fahrradergometer',eq:'cardio',p:['quads'],s:['glutes','calves','hamstrings'],set:'Sattelhöhe so einstellen, dass das Knie unten leicht gebeugt ist.',how:'Gleichmäßig treten, Widerstand so wählen, dass du dich noch unterhalten kannst (Grundlagenausdauer).',tip:'Intervalle: 30 Sekunden schnell, 90 Sekunden locker, 6–10 Wiederholungen.'}
];
const SPORTS={
 wandern:{n:'Wandern',m:{quads:3,glutes:3,calves:3,hamstrings:2,lowerback:1},f:['km','hm']},
 schwimmen:{n:'Schwimmen',m:{lats:4,shoulders:3,triceps:2,chest:2,reardelt:2,abs:1},f:['m']},
 bouldern:{n:'Bouldern',m:{forearms:5,lats:4,biceps:3,reardelt:2,traps:2,abs:2,shoulders:1},f:['routes','grade']},
 laufen:{n:'Laufen',m:{quads:3,calves:3,hamstrings:2,glutes:2},f:['km']},
 radfahren:{n:'Radfahren',m:{quads:4,glutes:2,calves:2,hamstrings:1},f:['km','hm']},
 yoga:{n:'Yoga / Mobility',m:{abs:2,obliques:2,lowerback:2,shoulders:1,hamstrings:1},f:[]},
 sonst:{n:'Sonstiges',m:{},f:[]}};
const FL={km:'Distanz (km)',hm:'Höhenmeter',m:'Strecke (m)',routes:'Routen geschafft',grade:'Schwierigster Grad'};
const GOALS={
 muskel:{n:'Muskelaufbau',cs:3,cr:'6–10',is:3,ir:'10–12',rest:90},
 kraft:{n:'Maximalkraft',cs:4,cr:'4–6',is:3,ir:'8–10',rest:150},
 fitness:{n:'Allgemeine Fitness',cs:3,cr:'10–12',is:2,ir:'12–15',rest:60,cardio:15},
 abnehmen:{n:'Abnehmen / Körperfett',cs:3,cr:'10–12',is:3,ir:'12–15',rest:60,cardio:20},
 gesund:{n:'Gesundheit & Haltung',cs:2,cr:'10–12',is:2,ir:'12–15',rest:75}};
const LEVELS={anf:'Einsteiger (unter 6 Monate)',fort:'Fortgeschritten (6 Monate bis 2 Jahre)',erf:'Erfahren (über 2 Jahre)'};
const LIMITS={knie:{n:'Knie',x:['kniebeuge','ausfallschritte','bulgarian','beinstrecker','laufband']},ruecken:{n:'Unterer Rücken',x:['kreuzheben','lh-rudern','kniebeuge','rum-kreuzheben']},schulter:{n:'Schulter',x:['dips','kh-schulterdruecken','bankdruecken','ueberkopf-trizeps']}};
const TPL={
 GK_A:{n:'Ganzkörper A',m:['quads','chest','lats','shoulders','hamstrings','biceps','triceps','abs']},
 GK_B:{n:'Ganzkörper B',m:['glutes','lats','chest','reardelt','quads','triceps','calves','obliques']},
 GK_C:{n:'Ganzkörper C',m:['hamstrings','chest','lats','shoulders','quads','biceps','abs','lowerback']},
 PUSH:{n:'Push: Brust, Schultern, Trizeps',m:['chest','shoulders','chest','shoulders','triceps','triceps','chest','abs']},
 PULL:{n:'Pull: Rücken, Bizeps',m:['lats','lats','reardelt','traps','biceps','biceps','lowerback','forearms']},
 LEGS:{n:'Beine & Po',m:['quads','hamstrings','glutes','calves','quads','adductors','abs','hamstrings']},
 UPPER:{n:'Oberkörper A',m:['chest','lats','shoulders','lats','triceps','biceps','reardelt','chest']},
 LOWER:{n:'Unterkörper A',m:['quads','hamstrings','glutes','calves','abs','adductors','lowerback','quads']},
 UPPER2:{n:'Oberkörper B',m:['lats','chest','shoulders','chest','biceps','triceps','traps','lats']},
 LOWER2:{n:'Unterkörper B',m:['hamstrings','quads','glutes','calves','obliques','quads','adductors','abs']}};

/* ================= Anatomie ================= */
const FRONT={traps:['p','M93 55 L78 62 Q88 64 94 64 Z'],shoulders:['e',58,77,11,13],chest:['p','M99 68 L71 68 Q63 80 68 100 Q84 110 99 105 Z'],biceps:['e',52,113,7,18],forearms:['e',47,176,7,26],abs:['p','M99 110 L87 112 L87 178 Q92 190 99 193 Z'],obliques:['p','M85 114 L71 108 Q67 150 71 186 L85 180 Z'],quads:['p','M69 226 Q64 262 74 298 L92 300 Q97 262 94 228 Z'],adductors:['p','M96 228 L99 238 L99 270 Q94 262 93 242 Z'],calves:['e',83,334,8,24]};
const BACK={traps:['p','M99 50 L93 52 L93 58 L66 66 Q84 76 99 108 Z'],reardelt:['e',58,78,11,12],triceps:['e',52,113,7,18],forearms:['e',47,176,7,26],lats:['p','M97 110 Q84 84 68 92 Q66 128 82 166 L97 150 Z'],lowerback:['p','M99 152 L85 168 L87 196 L99 198 Z'],glutes:['p','M99 202 Q78 196 68 212 Q67 236 82 242 Q96 242 99 232 Z'],hamstrings:['p','M70 246 Q66 276 76 300 L93 300 Q98 272 96 246 Z'],calves:['e',83,330,10,27]};
const SIL='M100 44 L93 44 L93 56 Q72 58 60 62 L66 100 Q70 150 68 190 Q64 208 66 222 Q63 262 70 300 Q70 340 74 376 L70 392 L95 392 L95 372 Q98 330 95 300 Q100 262 100 242 Z';
const ARM='M54 62 Q40 68 42 95 L40 150 L36 210 Q34 230 42 236 Q50 234 50 220 L58 152 L65 100 Z';
const shp=s=>s[0]==='e'?`<ellipse cx="${s[1]}" cy="${s[2]}" rx="${s[3]}" ry="${s[4]}"/>`:`<path d="${s[1]}"/>`;
function body(v,fill){
 const sh=v==='f'?FRONT:BACK, half=`<path class="sil" d="${SIL}"/><path class="sil" d="${ARM}"/>`;
 let mus='';for(const [m,s] of Object.entries(sh))mus+=`<g class="m" data-m="${m}" style="fill:${fill(m)}"><title>${MN[m]}</title>${shp(s)}</g>`;
 const mir='transform="translate(200 0) scale(-1 1)"';
 return `<svg class="body" viewBox="0 0 200 400" role="img" aria-label="${v==='f'?'Körper vorne':'Körper hinten'}"><circle class="sil" cx="100" cy="26" r="17"/>${half}<g ${mir}>${half}</g>${mus}<g ${mir}>${mus}</g></svg>`;
}
const figs=(fill,cls='')=>`<div class="figs ${cls}"><div class="fig2">${body('f',fill)}<span class="sm mut">Vorne</span></div><div class="fig2">${body('b',fill)}<span class="sm mut">Hinten</span></div></div>`;
const heatCol=r=>r<=.001?'var(--m0)':r<.5?'var(--blue)':r<1?'var(--grn)':r<1.6?'var(--yel)':'var(--red)';
const LEGEND=`<div class="legend"><span><i style="background:var(--m0)"></i>nicht trainiert</span><span><i style="background:var(--blue)"></i>zu wenig</span><span><i style="background:var(--grn)"></i>gut dabei</span><span><i style="background:var(--yel)"></i>Ziel erreicht</span><span><i style="background:var(--red)"></i>sehr viel</span></div>`;

/* ================= Helfer ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const J=o=>JSON.parse(JSON.stringify(o));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const todayISO=()=>iso(new Date());
const addDays=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return iso(d)};
const WD=['Mo','Di','Mi','Do','Fr','Sa','So'],WDL=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
const wdOf=s=>(new Date(s+'T12:00').getDay()+6)%7;
const fmtD=s=>new Date(s+'T12:00').toLocaleDateString('de-DE',{weekday:'short',day:'numeric',month:'short'});
const daysAgo=s=>Math.round((new Date(todayISO()+'T12:00')-new Date(s+'T12:00'))/864e5);
const num=n=>(Math.round(n*10)/10).toLocaleString('de-DE');
const e1=s=>(+s.kg||0)*(1+(+s.r||0)/30);

/* ================= Zustand & Speicher ================= */
const DEF=()=>({v:1,mt:0,profile:null,plans:[],active:null,weights:{},custom:[],draft:null,del:[]});
let S=DEF(),LOGS={};
let VIEW='heute',SEL=new Set(),SUG=null,PERIOD=28,PROG=null,LQ='',LM='',LE='',OPEN=new Set(),REST=null,PICK=null,CF=null,CHART=null;
const allEx=()=>EX.concat(S.custom||[]);
const exById=id=>allEx().find(x=>x.id===id)||{id,n:'Unbekannte Übung',eq:'frei',p:[],s:[]};
const sessions=()=>Object.values(LOGS).flat().sort((a,b)=>b.date.localeCompare(a.date)||(b.t||0)-(a.t||0));
const activePlan=()=>S.plans.find(p=>p.id===S.active)||null;
const excluded=(id,a)=>(a&&a.limits||[]).some(l=>LIMITS[l]&&LIMITS[l].x.includes(id));

const VERSION='1.2.0';
function lsGet(){try{return JSON.parse(localStorage.getItem('trainingsbuch')||'null')}catch(e){return null}}
function lsSet(){try{localStorage.setItem('trainingsbuch',JSON.stringify({S,LOGS}))}catch(e){toast('Speicher des Geräts voll – bitte Backup exportieren.')}}
const SY={ok:['ok','Synchronisiert'],lokal:['','Auf diesem Gerät'],laden:['','Lädt …'],speichern:['','Synchronisiert …'],offline:['warn','Offline – wird später synchronisiert'],fehler:['err','Sync fehlgeschlagen']};
let SYNC='lokal';
function setSync(k){SYNC=k;const [c,t]=SY[k];const el=$('#sync');if(el)el.innerHTML=`<span class="dot ${c}"></span><span>${t}</span>`}
/* --- Konto & Sync (eigener Supabase-Server, Benutzername + Passwort) --- */
const CFGK='trainingsbuch-konto';
let SC=(()=>{try{return JSON.parse(localStorage.getItem(CFGK)||'{}')}catch(e){return {}}})();
const DEFCFG=window.TB_CONFIG||{};
const srvUrl=()=>(SC.url||DEFCFG.supabaseUrl||'').trim().replace(/\/+$/,'');
const srvKey=()=>(SC.key||DEFCFG.supabaseKey||'').trim();
function saveSC(){try{localStorage.setItem(CFGK,JSON.stringify(SC))}catch(e){}}
let DIRTY=false,SYNCING=false,AGAIN=false,STT;
async function rpc(fn,body){
 if(!srvUrl()||!srvKey())throw new Error('Kein Server eingerichtet');
 const h={'Content-Type':'application/json',apikey:srvKey()};if(srvKey().startsWith('eyJ'))h.Authorization='Bearer '+srvKey();
 const r=await fetch(srvUrl()+'/rest/v1/rpc/'+fn,{method:'POST',headers:h,body:JSON.stringify(body)});
 const t=await r.text();let j;try{j=JSON.parse(t)}catch(e){j=t}
 if(!r.ok){const err=new Error((j&&(j.message||j.hint))||('Serverfehler '+r.status));err.status=r.status;throw err}
 return j;
}
function mergeIn(R){
 if(!R||!R.S)return false;const rS=R.S,rL=R.LOGS||{},before=JSON.stringify({S,LOGS});
 const del=new Set([...(rS.del||[]),...(S.del||[])]),byId=new Map();
 for(const src of [rL,LOGS])for(const arr of Object.values(src))for(const x of arr||[])if(!del.has(x.id))byId.set(x.id,x);
 const L={};for(const x of byId.values())(L[x.date.slice(0,7)]=L[x.date.slice(0,7)]||[]).push(x);
 if((rS.mt||0)>(S.mt||0))S={...DEF(),...rS};
 S.del=[...del].slice(-1000);LOGS=L;lsSet();
 return JSON.stringify({S,LOGS})!==before;
}
async function syncNow(){
 if(!SC.token)return;if(!navigator.onLine){setSync('offline');return}
 if(SYNCING){AGAIN=true;return}SYNCING=true;setSync('speichern');
 try{
  let changed=false;
  for(let i=0;i<3;i++){
   const pull=await rpc('tb_pull',{p_token:SC.token});
   if(pull.updated_at!==SC.base){changed=mergeIn(pull.data)||changed;SC.base=pull.updated_at}
   if(!DIRTY&&pull.data&&pull.data.S&&!changed)break;
   DIRTY=false;
   const out=await rpc('tb_push',{p_token:SC.token,p_data:{S,LOGS},p_base:SC.base});
   if(out.conflict){DIRTY=true;continue}
   SC.base=out.updated_at;break;
  }
  SC.last=Date.now();saveSC();setSync('ok');if(changed&&!document.querySelector('.ov')&&!(VIEW==='training'&&S.draft))render();
 }catch(e){
  if(/angemeldet/i.test(e.message)){SC.token=null;saveSC();toast('Bitte neu anmelden');}
  setSync(navigator.onLine?'fehler':'offline');DIRTY=true;
 }
 SYNCING=false;if(AGAIN){AGAIN=false;syncNow()}
}
function persist(key){
 if(key==='state'||key==='all')S.mt=Date.now();
 lsSet();DIRTY=true;
 if(SC.token){clearTimeout(STT);STT=setTimeout(syncNow,4000)}
}
function persistAll(){persist('all')}
async function initStore(){
 const c=lsGet();if(c&&c.S){S={...DEF(),...c.S};LOGS=c.LOGS||{}}
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
 setSync(SC.token?'laden':'lokal');render();
 if(SC.token)syncNow();
}
window.addEventListener('online',()=>SC.token&&syncNow());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&SC.token)syncNow();else if(DIRTY&&SC.token)syncNow()});
setInterval(()=>{if(DIRTY&&SC.token&&!SYNCING)syncNow()},60000);
function addSession(s){const mk=s.date.slice(0,7);(LOGS[mk]=LOGS[mk]||[]).push(s);persist('log-'+mk)}
function delSession(id,date){const mk=date.slice(0,7);LOGS[mk]=(LOGS[mk]||[]).filter(s=>s.id!==id);S.del=(S.del||[]).concat(id);persist('state')}

/* ================= Auswertung ================= */
function load(days){
 const L=Object.fromEntries(MUS.map(m=>[m.id,0]));
 for(const s of sessions()){if(daysAgo(s.date)>=days||daysAgo(s.date)<0)continue;
  if(s.type==='gym'){for(const e of s.ex){const x=exById(e.id),n=e.sets.length;x.p.forEach(m=>L[m]!=null&&(L[m]+=n));(x.s||[]).forEach(m=>L[m]!=null&&(L[m]+=n*.5))}}
  else{const sp=SPORTS[s.sport];if(!sp)continue;const h=(+s.dur||0)/60;for(const [m,v] of Object.entries(sp.m))L[m]+=v*h}}
 return L;
}
function ratios(days){const L=load(days),R={};MUS.forEach(m=>R[m.id]=L[m.id]/(m.t*days/7));return {L,R}}
function history(id){const out=[];for(const s of sessions().slice().reverse())if(s.type==='gym'){const e=s.ex.find(e=>e.id===id);if(e&&e.sets.length)out.push({date:s.date,sets:e.sets})}return out}
function lastKg(id){const h=history(id);if(h.length){const st=h.at(-1).sets;return st.reduce((a,b)=>(+b.kg>+a.kg?b:a)).kg}return S.weights[id]&&S.weights[id].kg!=null?S.weights[id].kg:''}
function lastLine(id){const h=history(id);if(!h.length)return S.weights[id]?`Gespeichert: ${num(S.weights[id].kg)} kg${S.weights[id].r?' × '+S.weights[id].r:''}`:'Noch nicht gemacht';const l=h.at(-1);return `Letztes Mal (${fmtD(l.date)}): `+l.sets.map(s=>`${num(s.kg)}×${s.r}`).join(', ')}

/* ================= Planer ================= */
function genPlan(a){
 const g=GOALS[a.goal]||GOALS.muskel,days=(a.days.length?a.days:['0','2','4']).map(Number).sort((x,y)=>x-y).slice(0,6),n=days.length;
 const lightGoal=a.level==='anf'||['fitness','abnehmen','gesund'].includes(a.goal);
 const split=n<=1?['GK_A']:n===2?['GK_A','GK_B']:n===3?(lightGoal?['GK_A','GK_B','GK_C']:['PUSH','PULL','LEGS']):n===4?['UPPER','LOWER','UPPER2','LOWER2']:n===5?['PUSH','PULL','LEGS','UPPER','LOWER']:['PUSH','PULL','LEGS','PUSH','PULL','LEGS'];
 const slots={45:5,60:6,75:7,90:8}[a.dur]||6,used={};
 const pool=allEx().filter(x=>x.eq!=='cardio'&&(!a.eq.length||a.eq.includes(x.eq))&&!excluded(x.id,a));
 const score=(x,si)=>(si<3&&x.c?2:0)+(a.level==='anf'&&x.eq==='maschine'?1.2:0)+(a.level==='erf'&&x.eq==='frei'?.8:0)-(used[x.id]||0)*1.5+Math.random()*.6;
 const pDays=split.map((k,di)=>{
  const T=TPL[k];let ms=T.m.slice();
  (a.focus||[]).filter(m=>T.m.includes(m)||k.startsWith('GK')).slice(0,2).forEach(m=>ms.splice(2,0,m));
  ms=ms.slice(0,slots);const items=[],inDay=new Set();
  ms.forEach((m,si)=>{const c=pool.filter(x=>x.p.includes(m)&&!inDay.has(x.id));if(!c.length)return;c.sort((A,B)=>score(B,si)-score(A,si));const x=c[0];inDay.add(x.id);used[x.id]=(used[x.id]||0)+1;
   const comp=!!x.c;items.push({ex:x.id,sets:Math.max(2,(comp?g.cs:g.is)-(a.level==='anf'&&g.cs>2?1:0)),reps:comp?g.cr:g.ir,rest:comp?g.rest:Math.round(g.rest*.75)})});
  if(g.cardio){const cc=allEx().filter(x=>x.eq==='cardio'&&!excluded(x.id,a));if(cc.length)items.push({ex:cc[di%cc.length].id,sets:1,reps:g.cardio+' min',rest:0})}
  return {name:T.n,items};
 });
 const sched=Array(7).fill(null);days.forEach((wd,i)=>sched[wd]={d:i});
 const free=[5,6,2,4,1,3,0].filter(i=>!sched[i]);(a.sports||[]).forEach(s=>{if(free.length>1)sched[free.shift()]={s}});
 const notes=[`Ziel: ${g.n}. Grundübungen ${g.cr} Wiederholungen, Isolationsübungen ${g.ir}.`,
  'Steigerung: Schaffst du in allen Sätzen das obere Ende der Wiederholungen sauber, erhöhe beim nächsten Mal das Gewicht um etwa 2,5–5 %.',
  'Wärme dich 5–10 Minuten locker auf und mache vor der ersten schweren Übung 1–2 leichte Aufwärmsätze.',
  a.level==='anf'?'Als Einsteigerin: Die ersten 2–3 Wochen bewusst leicht trainieren und die Technik lernen. Lass dir die Geräte im Studio einmal einstellen.':'Nach 6–8 Wochen lohnt sich eine leichtere Woche (etwa halbe Sätze), danach geht es meist besser weiter.'];
 if((a.limits||[]).length)notes.push('Bei Beschwerden wurden belastende Übungen ausgelassen. Das ersetzt keine ärztliche oder physiotherapeutische Beratung.');
 return {id:uid(),name:a.name||'Mein Plan',created:todayISO(),goal:a.goal,level:a.level,eq:a.eq,limits:a.limits,days:pDays,schedule:sched,notes};
}
function suggest(ms){
 const pr=S.profile||{},max=({45:5,60:6,75:7,90:8})[pr.dur]||6;
 const ex=allEx().filter(x=>x.eq!=='cardio'&&(!pr.eq||!pr.eq.length||pr.eq.includes(x.eq))&&!excluded(x.id,pr));
 const recent=new Set();sessions().filter(s=>s.type==='gym'&&daysAgo(s.date)<3).forEach(s=>s.ex.forEach(e=>recent.add(e.id)));
 const per=Math.max(1,Math.min(3,Math.round(max/ms.length))),out=[];
 for(const m of ms){const want=Math.min(per,MUS.find(u=>u.id===m).t>=8?3:2);
  ex.filter(x=>x.p.includes(m)&&!out.some(o=>o.id===x.id)).map(x=>({x,sc:x.p.concat(x.s||[]).filter(k=>ms.includes(k)&&k!==m).length*.6+(x.c?.8:0)-(recent.has(x.id)?2:0)+(pr.level==='anf'&&x.eq==='maschine'?.7:0)+Math.random()*.6}))
   .sort((a,b)=>b.sc-a.sc).slice(0,want).forEach(c=>out.push({id:c.x.id,on:true}))}
 return out.slice(0,Math.max(max,ms.length));
}
function draftEx(id,sets,reps,rest){const kg=lastKg(id);return {id,reps:reps||'',rest:rest==null?90:rest,sets:Array.from({length:sets||3},()=>({kg,r:'',done:false}))}}
function startDraft(name,ex,extra){S.draft={id:uid(),date:todayISO(),t:Date.now(),name,ex,...(extra||{})};persist('state');location.hash='#training';render()}

/* ================= Ansichten ================= */
function greet(){const h=new Date().getHours();return h<11?'Guten Morgen':h<18?'Hallo':'Guten Abend'}
function nextTraining(){
 const p=activePlan();if(!p)return null;const t=todayISO(),w0=wdOf(t),ss=sessions();
 for(let i=0;i<7;i++){const wd=(w0+i)%7,e=p.schedule[wd];if(!e)continue;
  if(i===0&&ss.some(s=>s.date===t&&(e.d!=null?(s.plan===p.id&&s.day===e.d):s.sport===e.s)))continue;
  if(e.d!=null&&!p.days[e.d])continue;return {i,wd,e,p,date:addDays(t,i)}}
 return null;
}
function weekStrip(){
 const t=todayISO(),w0=wdOf(t),p=activePlan(),ss=sessions();let h='<div class="week">';
 for(let i=0;i<7;i++){const d=addDays(t,i-w0),x=ss.filter(s=>s.date===d),cls=x.some(s=>s.type==='gym')?'g':x.length?'s':(p&&p.schedule[i]?'p':'');
  h+=`<div class="wd ${d===t?'now':''}"><span class="sm mut">${WD[i]}</span><div class="c ${cls}">${+d.slice(8)}</div></div>`}
 return h+'</div><div class="legend" style="margin-top:8px"><span><i style="background:var(--red)"></i>Studio</span><span><i style="background:var(--blue)"></i>andere Sportart</span><span><i style="border:2px dashed var(--mut)"></i>geplant</span></div>';
}
function vHeute(){
 let h=`<h1>${greet()}</h1><p class="mut" style="margin-bottom:14px">${new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})}</p>`;
 const nx=nextTraining();
 if(S.draft)h+=`<div class="card hero"><span class="tag live">Läuft gerade</span><h2>${esc(S.draft.name)}</h2><p class="mut">${S.draft.ex.length} Übungen · seit ${Math.round((Date.now()-S.draft.t)/60000)} min</p><a class="btn red" href="#training">Weitertrainieren</a></div>`;
 else if(nx){const lab=nx.i===0?'Heute':nx.i===1?'Morgen':WDL[nx.wd];
  if(nx.e.d!=null){const day=nx.p.days[nx.e.d];h+=`<div class="card hero"><span class="tag">${lab} · ${esc(nx.p.name)}</span><h2>${esc(day.name)}</h2><p class="mut">${day.items.map(it=>esc(exById(it.ex).n)).slice(0,5).join(' · ')}${day.items.length>5?' …':''}</p><button class="${nx.i===0?'red':'pri'}" data-act="startDay" data-p="${nx.p.id}" data-d="${nx.e.d}">${nx.i===0?'Training starten':'Jetzt schon starten'}</button></div>`}
  else h+=`<div class="card hero"><span class="tag">${lab}</span><h2>${esc(SPORTS[nx.e.s]?.n||'Sport')}</h2><p class="mut">Laut Wochenplan steht eine andere Sportart an.</p><button class="pri" data-act="sportForm" data-s="${nx.e.s}">Eintragen</button></div>`}
 else if(!S.plans.length)h+=`<div class="card hero"><span class="tag">Los geht’s</span><h2>Erstelle deinen ersten Trainingsplan</h2><p class="mut">Ein kurzer Fragebogen zu Ziel, Erfahrung und Zeit – daraus entsteht ein Plan mit Wochenzeitplan.</p><button class="red" data-act="quiz">Fragebogen starten</button></div>`;
 h+=`<div class="card">${weekStrip()}</div>`;
 h+=`<div class="card"><h2>Was trainierst du heute?</h2><p class="mut sm">Tippe auf die Figur oder die Namen. Du bekommst passende Übungen vorgeschlagen.</p>${figs(m=>SEL.has(m)?'var(--red)':'var(--m0)','pick')}
 <div class="chips">${MUS.map(m=>`<button class="chip ${SEL.has(m.id)?'on':''}" data-act="selm" data-m="${m.id}" aria-pressed="${SEL.has(m.id)}">${m.n}</button>`).join('')}</div>
 <div class="row" style="margin-top:14px"><button class="pri" data-act="suggest" ${SEL.size?'':'disabled'}>Übungen vorschlagen</button>${SEL.size?'<button class="ghost" data-act="clearSel">Auswahl leeren</button>':''}</div>`;
 if(SUG){h+=`<h3 style="margin-top:18px">Vorschlag</h3><ul class="list">${SUG.map((s,i)=>{const x=exById(s.id);return `<li><button class="ok ${s.on?'on':''}" data-act="sugTog" data-i="${i}" aria-label="Auswählen">✓</button><div class="grow"><button class="linkish" data-act="info" data-id="${x.id}">${esc(x.n)}</button><div class="sm mut">${x.p.map(m=>MN[m]).join(', ')} · ${EQ[x.eq]}</div></div><button class="ghost" data-act="sugSwap" data-i="${i}">Tauschen</button></li>`}).join('')}</ul>
 <div class="row" style="margin-top:10px"><button class="red" data-act="sugStart">Workout starten</button><button data-act="suggest">Neu würfeln</button></div>`}
 h+=`</div><div class="card"><div class="row sp"><div><h3>Andere Sportart</h3><p class="mut sm">Wandern, Schwimmen, Bouldern … zählt in deine Muskelübersicht.</p></div><button data-act="sportForm">Eintragen</button></div></div>`;
 return h;
}
function vTraining(){
 const d=S.draft;
 if(!d){const p=activePlan(),ss=sessions().slice(0,5);
  return `<h1>Training</h1><p class="mut" style="margin-bottom:14px">Starte eine Einheit oder trage eine andere Sportart ein.</p>
  ${p?`<div class="card"><h3>Aus „${esc(p.name)}“</h3><ul class="list">${p.days.map((day,i)=>`<li><div class="grow"><b>${esc(day.name)}</b><div class="sm mut">${day.items.length} Übungen</div></div><button class="pri" data-act="startDay" data-p="${p.id}" data-d="${i}">Starten</button></li>`).join('')}</ul></div>`:`<div class="card"><p>Noch kein Plan aktiv.</p><button class="pri" data-act="quiz">Plan per Fragebogen erstellen</button></div>`}
  <div class="card"><div class="g2"><button data-act="startEmpty">Freies Training</button><a class="btn" href="#heute">Nach Muskelgruppen</a></div></div>
  <div class="card"><h3>Andere Sportart eintragen</h3><div class="chips" style="margin-top:10px">${Object.entries(SPORTS).map(([k,s])=>`<button class="chip" data-act="sportForm" data-s="${k}">${s.n}</button>`).join('')}</div></div>
  ${ss.length?`<div class="card"><h3>Zuletzt</h3><ul class="list">${ss.map(sessLi).join('')}</ul></div>`:''}`}
 let h=`<div class="card"><span class="tag live">Läuft · <span id="elapsed">${fmtEl(d.t)}</span></span><input aria-label="Name der Einheit" data-in="dname" value="${esc(d.name)}" style="margin-top:10px;font:700 24px 'Barlow Condensed',sans-serif"></div>`;
 d.ex.forEach((e,i)=>{const x=exById(e.id);
  h+=`<div class="card"><div class="row sp" style="flex-wrap:nowrap;align-items:flex-start"><div><button class="linkish" data-act="info" data-id="${x.id}" style="font:700 20px 'Barlow Condensed',sans-serif">${esc(x.n)}</button><div class="sm mut">${esc(lastLine(e.id))}</div></div><button class="ghost ico" data-act="remEx" data-i="${i}" aria-label="Übung entfernen">✕</button></div>
  <div class="setrow sethead"><span>Satz</span><span style="text-align:right">kg</span><span style="text-align:right">Wdh.${e.reps?' ('+esc(e.reps)+')':''}</span><span></span></div>
  ${e.sets.map((s,j)=>`<div class="setrow"><span class="n">${j+1}</span><input type="number" inputmode="decimal" step="0.5" min="0" aria-label="Gewicht Satz ${j+1}" data-in="kg" data-i="${i}" data-j="${j}" value="${esc(s.kg)}"><input type="number" inputmode="numeric" min="0" aria-label="Wiederholungen Satz ${j+1}" data-in="r" data-i="${i}" data-j="${j}" value="${esc(s.r)}" placeholder="${esc(parseInt(e.reps)||'')}"><button class="ok ${s.done?'on':''}" data-act="done" data-i="${i}" data-j="${j}" aria-label="Satz erledigt">✓</button></div>`).join('')}
  <div class="row" style="margin-top:10px"><button data-act="addSet" data-i="${i}">+ Satz</button>${e.sets.length>1?`<button class="ghost" data-act="remSet" data-i="${i}">– Satz</button>`:''}</div></div>`});
 h+=`<button class="wide" data-act="addEx" style="margin-bottom:14px">+ Übung hinzufügen</button><div class="g2"><button class="red" data-act="finish">Beenden & speichern</button><button data-act="discard">Verwerfen</button></div>`;
 return h;
}
const fmtEl=t=>{const m=Math.floor((Date.now()-t)/60000);return m<60?m+' min':Math.floor(m/60)+' h '+(m%60)+' min'};
function sessLi(s){
 const meta=s.type==='gym'?`${s.ex.length} Übungen · ${s.ex.reduce((a,e)=>a+e.sets.length,0)} Sätze${s.dur?' · '+s.dur+' min':''}`:[s.dur&&s.dur+' min',s.km&&num(s.km)+' km',s.m&&s.m+' m',s.hm&&s.hm+' hm',s.routes&&s.routes+' Routen',s.grade&&esc(s.grade)].filter(Boolean).join(' · ');
 return `<li><div class="c" style="width:10px;height:10px;border-radius:50%;background:${s.type==='gym'?'var(--red)':'var(--blue)'};flex:none"></div><div class="grow"><button class="linkish" data-act="showS" data-id="${s.id}">${esc(s.type==='gym'?s.name:SPORTS[s.sport]?.n||'Sport')}</button><div class="sm mut">${fmtD(s.date)} · ${meta}</div></div><button class="ghost ico" data-act="delS" data-id="${s.id}" data-d="${s.date}" aria-label="Löschen">✕</button></li>`;
}
function vPlaene(){
 let h=`<div class="row sp" style="margin-bottom:14px"><h1>Pläne</h1><button class="red" data-act="quiz">Neuer Plan</button></div>`;
 if(!S.plans.length)return h+`<div class="card empty"><h2>Noch keine Pläne</h2><p class="mut">Beantworte ein paar Fragen zu Ziel, Erfahrung, Zeit und Ausstattung. Du kannst beliebig viele Pläne anlegen und einen davon aktiv setzen.</p><button class="pri" data-act="quiz">Fragebogen starten</button></div>`;
 for(const p of S.plans){const act=p.id===S.active,open=OPEN.has(p.id)||(act&&!OPEN.has('x'+p.id));
  h+=`<details class="card" data-pid="${p.id}" ${open?'open':''}><summary><div class="row sp"><div><h2>${esc(p.name)}</h2><div class="sm mut">${GOALS[p.goal]?.n||''} · ${p.days.length}× pro Woche · erstellt ${fmtD(p.created)}</div></div>${act?'<span class="tag live">Aktiv</span>':'<span class="tag">Inaktiv</span>'}</div></summary>
  <div class="row" style="margin-top:12px">${act?'':`<button class="pri" data-act="activate" data-p="${p.id}">Aktiv setzen</button>`}<button data-act="renameP" data-p="${p.id}">Umbenennen</button><button class="ghost" data-act="delP" data-p="${p.id}">Löschen</button></div>
  <h3 style="margin-top:18px">Wochenplan</h3><div class="g2" style="margin-top:8px">${WD.map((w,i)=>`<label class="sm"><b>${WDL[i]}</b><select data-in="sched" data-p="${p.id}" data-wd="${i}"><option value="">Ruhetag</option>${p.days.map((d,j)=>`<option value="d:${j}" ${p.schedule[i]&&p.schedule[i].d===j?'selected':''}>${esc(d.name)}</option>`).join('')}${Object.entries(SPORTS).map(([k,s])=>`<option value="s:${k}" ${p.schedule[i]&&p.schedule[i].s===k?'selected':''}>${s.n}</option>`).join('')}</select></label>`).join('')}</div>`;
  p.days.forEach((d,di)=>{h+=`<div style="margin-top:20px"><div class="row sp"><h3>${esc(d.name)}</h3><button class="pri" data-act="startDay" data-p="${p.id}" data-d="${di}">Starten</button></div><ul class="list">${d.items.map((it,ii)=>{const x=exById(it.ex);return `<li><div class="grow"><button class="linkish" data-act="info" data-id="${x.id}">${esc(x.n)}</button><div class="sm mut">${x.p.map(m=>MN[m]).join(', ')}${S.weights[x.id]?' · zuletzt '+num(S.weights[x.id].kg)+' kg':''}</div></div><button class="ghost" data-act="editItem" data-p="${p.id}" data-d="${di}" data-i="${ii}">${it.sets} × ${esc(it.reps)}</button><button class="ghost ico" data-act="swapItem" data-p="${p.id}" data-d="${di}" data-i="${ii}" aria-label="Übung tauschen" title="Tauschen">↻</button><button class="ghost ico" data-act="remItem" data-p="${p.id}" data-d="${di}" data-i="${ii}" aria-label="Entfernen">✕</button></li>`}).join('')}</ul><div class="row"><button data-act="planAdd" data-p="${p.id}" data-d="${di}">+ Übung</button><button class="ghost" data-act="renameDay" data-p="${p.id}" data-d="${di}">Tag umbenennen</button></div></div>`});
  h+=`<div class="row" style="margin-top:16px"><button data-act="addDay" data-p="${p.id}">+ Trainingstag</button></div>${p.notes&&p.notes.length?`<div class="note" style="margin-top:16px"><b>Hinweise</b><ul class="steps">${p.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div>`:''}</details>`}
 return h;
}
function vFortschritt(){
 const {L,R}=ratios(PERIOD),ss=sessions().filter(s=>daysAgo(s.date)<PERIOD&&daysAgo(s.date)>=0);
 const sets=ss.reduce((a,s)=>a+(s.type==='gym'?s.ex.reduce((b,e)=>b+e.sets.length,0):0),0),vol=ss.reduce((a,s)=>a+(s.type==='gym'?s.ex.reduce((b,e)=>b+e.sets.reduce((c,x)=>c+(+x.kg||0)*(+x.r||0),0),0):0),0),mins=ss.reduce((a,s)=>a+(+s.dur||0),0);
 let h=`<h1>Fortschritt</h1><div class="seg" style="margin:14px 0">${[7,14,28,90].map(n=>`<button class="${PERIOD===n?'on':''}" data-act="period" data-n="${n}">${n===28?'4 Wochen':n===90?'3 Monate':n+' Tage'}</button>`).join('')}</div>`;
 h+=`<div class="card"><h2>Muskelbelastung</h2><p class="mut sm">Sätze pro Muskel im Verhältnis zu einem üblichen Wochenziel. Andere Sportarten zählen anteilig mit. Tippe einen Muskel an.</p>${figs(m=>heatCol(R[m]),'heat')}${LEGEND}<p id="heatinfo" class="note" style="margin-top:12px">Tippe auf einen Muskel für Details.</p></div>`;
 const low=MUS.filter(m=>R[m.id]<.5).sort((a,b)=>R[a.id]-R[b.id]),high=MUS.filter(m=>R[m.id]>=1.6);
 const mrow=m=>`<li><div class="grow"><div class="row sp"><span>${m.n}</span><span class="sm mut">${num(L[m.id])} / ${num(m.t*PERIOD/7)} Sätze</span></div><div class="meter"><div style="width:${Math.min(100,R[m.id]/1.6*100)}%;background:${heatCol(R[m.id])}"></div></div></div></li>`;
 h+=`<div class="card"><h2>Nachholbedarf</h2>${low.length?`<ul class="list">${low.map(mrow).join('')}</ul><button class="pri" style="margin-top:10px" data-act="fillGaps">Training für diese Muskeln vorschlagen</button>`:'<p class="mut">Alles im grünen Bereich.</p>'}${high.length?`<h3 style="margin-top:18px">Sehr viel trainiert</h3><ul class="list">${high.map(mrow).join('')}</ul>`:''}</div>`;
 h+=`<div class="card"><div class="stats"><div class="stat"><b>${ss.length}</b><span>Einheiten</span></div><div class="stat"><b>${num(mins/60)} h</b><span>Trainingszeit</span></div><div class="stat"><b>${sets}</b><span>Sätze im Studio</span></div><div class="stat"><b>${num(vol/1000)} t</b><span>bewegtes Gewicht</span></div></div>`;
 const t=todayISO(),ws=addDays(t,-wdOf(t)),wk=[];for(let i=7;i>=0;i--){const a=addDays(ws,-7*i),b=addDays(a,7),x=sessions().filter(s=>s.date>=a&&s.date<b);wk.push({a,g:x.filter(s=>s.type==='gym').length,s:x.filter(s=>s.type!=='gym').length})}
 const mx=Math.max(3,...wk.map(w=>w.g+w.s));
 h+=`<h3 style="margin-top:18px">Einheiten pro Woche</h3><div class="bars">${wk.map(w=>`<div class="bar" title="${w.g} Studio, ${w.s} andere"><div class="g" style="height:${w.g/mx*100}%"></div><div class="s" style="height:${w.s/mx*100}%"></div></div>`).join('')}</div><div class="bl">${wk.map(w=>`<span>${+w.a.slice(8)}.${+w.a.slice(5,7)}.</span>`).join('')}</div></div>`;
 const done=[...new Set(sessions().filter(s=>s.type==='gym').flatMap(s=>s.ex.map(e=>e.id)))];
 if(done.length){if(!PROG||!done.includes(PROG))PROG=done[0];const hi=history(PROG),bw=hi.every(x=>x.sets.every(s=>!+s.kg));
  CHART={bw,pts:hi.map(x=>({d:x.date,v:bw?Math.max(...x.sets.map(s=>+s.r||0)):Math.max(...x.sets.map(e1))}))};const best=Math.max(...CHART.pts.map(p=>p.v));
  h+=`<div class="card"><h2>Entwicklung pro Übung</h2><select data-in="prog" style="margin-top:10px">${done.map(id=>`<option value="${id}" ${id===PROG?'selected':''}>${esc(exById(id).n)}</option>`).join('')}</select><p class="sm mut" style="margin-top:10px">${bw?'Beste Wiederholungszahl pro Einheit':'Geschätztes 1-Wiederholungs-Maximum (Epley-Formel) aus deinem besten Satz'} · Bestwert <b style="color:var(--ink)">${num(best)}${bw?' Wdh.':' kg'}</b> · ${hi.length} Einheiten</p><div class="chart"><svg id="pchart" aria-label="Verlauf"></svg></div></div>`}
 const all=sessions().slice(0,25);
 h+=`<div class="card"><h2>Verlauf</h2>${all.length?`<ul class="list">${all.map(sessLi).join('')}</ul>`:'<p class="mut">Noch keine Einheiten gespeichert.</p>'}</div>`;
 return h;
}
function drawChart(){
 const s=$('#pchart');if(!s||!CHART)return;const W=s.clientWidth,H=s.clientHeight;if(!W||!H)return;const P=CHART.pts;if(!P.length){s.innerHTML='';return}
 const l=42,r=14,t=14,b=26,vs=P.map(p=>p.v);let mn=Math.min(...vs),mx=Math.max(...vs);if(mx-mn<1){mn-=1;mx+=1}const pd=(mx-mn)*.12;mn=Math.max(0,mn-pd);mx+=pd;
 const t0=+new Date(P[0].d),t1=+new Date(P.at(-1).d),X=d=>t1===t0?l+(W-l-r)/2:l+(new Date(d)-t0)/(t1-t0)*(W-l-r),Y=v=>t+(1-(v-mn)/(mx-mn))*(H-t-b);
 let g='';for(let i=0;i<=3;i++){const v=mn+(mx-mn)*i/3,y=Y(v);g+=`<line x1="${l}" x2="${W-r}" y1="${y}" y2="${y}" stroke="var(--line)"/><text x="${l-6}" y="${y+4}" text-anchor="end">${Math.round(v)}</text>`}
 const d=P.map((p,i)=>(i?'L':'M')+X(p.d).toFixed(1)+' '+Y(p.v).toFixed(1)).join(' ');
 g+=`<path d="${d}" fill="none" stroke="var(--red)" stroke-width="2.5" stroke-linejoin="round"/>`+P.map(p=>`<circle cx="${X(p.d)}" cy="${Y(p.v)}" r="4" fill="var(--red)"><title>${fmtD(p.d)}: ${num(p.v)}</title></circle>`).join('');
 const f=x=>new Date(x+'T12:00').toLocaleDateString('de-DE',{day:'numeric',month:'short'});
 g+=`<text x="${l}" y="${H-6}">${f(P[0].d)}</text>`+(P.length>1&&W>300?`<text x="${W-r}" y="${H-6}" text-anchor="end">${f(P.at(-1).d)}</text>`:'');
 s.innerHTML=g;
}
function vUebungen(){
 return `<div class="row sp" style="margin-bottom:14px"><h1>Übungen & Geräte</h1><button data-act="customEx">Eigene Übung</button></div>
 <div class="card"><input type="search" placeholder="Suchen, z. B. Latzug" aria-label="Suche" data-in="lq" value="${esc(LQ)}"><div class="g2" style="margin-top:10px"><select data-in="lm" aria-label="Muskel"><option value="">Alle Muskeln</option>${MUS.map(m=>`<option value="${m.id}" ${LM===m.id?'selected':''}>${m.n}</option>`).join('')}</select><select data-in="le" aria-label="Ausstattung"><option value="">Alle Geräte</option>${Object.entries(EQ).map(([k,v])=>`<option value="${k}" ${LE===k?'selected':''}>${v}</option>`).join('')}</select></div></div>
 <div class="card"><ul class="list" id="liblist">${libList()}</ul></div>`;
}
function libList(){
 const q=LQ.trim().toLowerCase(),xs=allEx().filter(x=>(!q||x.n.toLowerCase().includes(q))&&(!LM||x.p.includes(LM)||(x.s||[]).includes(LM))&&(!LE||x.eq===LE));
 return xs.length?xs.map(x=>`<li><div class="grow"><button class="linkish" data-act="info" data-id="${x.id}">${esc(x.n)}</button><div class="sm mut">${x.p.map(m=>MN[m]).join(', ')}</div></div><span class="tag">${EQ[x.eq]}</span>${S.weights[x.id]?`<b style="white-space:nowrap">${num(S.weights[x.id].kg)} kg</b>`:''}</li>`).join(''):'<li class="mut">Nichts gefunden.</li>';
}
function vDaten(){
 const has=!!(srvUrl()&&srvKey()),last=SC.last?new Date(SC.last).toLocaleString('de-DE',{dateStyle:'short',timeStyle:'short'}):'noch nie';
 const konto=SC.token?`<p>Angemeldet als <b>${esc(SC.user)}</b>. Letzte Synchronisierung: ${last}.</p><div class="row"><button class="pri" data-act="syncNow">Jetzt synchronisieren</button><button class="ghost" data-act="logout">Abmelden</button></div>`
  :has?`<p class="mut sm">Mit einem Konto werden deine Daten auf deinem Server gesichert und zwischen Geräten abgeglichen. Ohne Konto bleibt alles nur auf diesem Gerät.</p><form id="acc"><label class="f">Benutzername<input name="u" autocomplete="username" required pattern="[A-Za-z0-9_.\-]{3,32}" title="3–32 Zeichen: Buchstaben, Ziffern, _ . -"></label><label class="f">Passwort<input name="p" type="password" autocomplete="current-password" required minlength="8"></label><div class="g2" style="margin-top:14px"><button class="pri" name="mode" value="login">Anmelden</button><button name="mode" value="register">Neues Konto</button></div></form>`
  :`<p class="mut sm">Noch kein Sync-Server eingerichtet. Wie das geht, steht in der Anleitung (README). Bis dahin bleiben die Daten auf diesem Gerät.</p>`;
 return `<h1>Daten & Konto</h1>
 <div class="card" style="margin-top:14px"><h3>Konto & Synchronisierung</h3>${konto}
 <details style="margin-top:14px"><summary class="sm mut">Server-Einstellungen ${has?'(eingerichtet)':''}</summary><form id="srv"><label class="f">Supabase Project URL<input name="url" value="${esc(srvUrl())}" placeholder="https://xxxx.supabase.co" inputmode="url"></label><label class="f">Publishable / anon key<input name="key" value="${esc(srvKey())}" placeholder="sb_publishable_… oder eyJ…"></label><button style="margin-top:10px">Server speichern</button></form></details></div>
 <div class="card"><h3>Backup</h3><p class="mut sm">Alle Pläne, Gewichte und Einheiten als Datei – unabhängig vom Konto.</p><div class="row"><button class="pri" data-act="downloadBk">Backup-Datei speichern</button><button data-act="copyBk">Als Text kopieren</button></div><textarea id="bkout" readonly aria-label="Backup-Text" style="margin-top:10px;display:none"></textarea>
 <h3 style="margin-top:18px">Wiederherstellen</h3><input type="file" id="bkfile" accept=".json,.txt,application/json,text/plain" aria-label="Backup-Datei wählen"><textarea id="bkin" placeholder="…oder Backup-Text hier einfügen" aria-label="Backup einfügen" style="margin-top:8px"></textarea><button style="margin-top:8px" data-act="importBk">Importieren</button></div>
 <div class="card"><h3>Als App installieren</h3><ol class="steps"><li>Die App-Adresse in <b>Chrome auf Android</b> öffnen.</li><li>Auf <b>⋮ → App installieren</b> (oder „Zum Startbildschirm hinzufügen“) tippen.</li><li>Ab jetzt startet das Trainingsbuch wie eine normale App und funktioniert auch offline.</li></ol><p class="sm mut">Updates kommen automatisch: Wenn eine neue Version bereitliegt, erscheint ein Hinweis zum Neuladen.</p></div>
 <div class="card"><h3>Zurücksetzen</h3><p class="mut sm">Löscht alle Pläne, Gewichte und Einheiten${SC.token?' – auch im Konto':''}.</p><button class="ghost" style="color:var(--red)" data-act="reset">Alles löschen</button></div><p class="sm mut" style="text-align:center">Version ${VERSION}</p>`;
}
const VIEWS={heute:vHeute,plaene:vPlaene,training:vTraining,fortschritt:vFortschritt,uebungen:vUebungen,daten:vDaten};
function render(){
 $('#main').innerHTML=VIEWS[VIEW]();
 document.querySelectorAll('nav.tabs a').forEach(a=>a.classList.toggle('on',a.dataset.v===VIEW));
 drawChart();renderRest();
}
function go(){const h=location.hash.slice(1);VIEW=VIEWS[h]?h:'heute';render();window.scrollTo(0,0)}

/* ================= Dialoge ================= */
function modal(html){closeModal();const o=document.createElement('div');o.className='ov';o.innerHTML=`<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;o.addEventListener('click',e=>{if(e.target===o)closeModal()});document.body.appendChild(o);document.body.style.overflow='hidden'}
function closeModal(){document.querySelectorAll('.ov').forEach(o=>o.remove());document.body.style.overflow='';if(CF){CF(false);CF=null}}
const mhead=t=>`<div class="row sp" style="flex-wrap:nowrap;margin-bottom:8px"><h2>${t}</h2><button class="ghost ico" data-act="close" aria-label="Schließen">✕</button></div>`;
function confirmDlg(text,ok){return new Promise(res=>{modal(`<h2>${esc(text)}</h2><div class="g2" style="margin-top:18px"><button class="red" data-act="cfYes">${esc(ok||'OK')}</button><button data-act="close">Abbrechen</button></div>`);CF=res})}
function promptDlg(title,val){return new Promise(res=>{modal(`${mhead(esc(title))}<form id="pf"><input id="pfv" value="${esc(val)}"><button class="pri wide" style="margin-top:12px">Speichern</button></form>`);CF=v=>res(v===false?null:v);setTimeout(()=>$('#pfv')?.focus(),50)})}
let TT;function toast(t){$('.toast:not(.upd)')?.remove();const d=document.createElement('div');d.className='toast';d.setAttribute('role','status');d.textContent=t;document.body.appendChild(d);clearTimeout(TT);TT=setTimeout(()=>d.remove(),2600)}
function pickEx(cb){PICK=cb;modal(`${mhead('Übung wählen')}<input type="search" id="pq" placeholder="Suchen" aria-label="Übung suchen"><select id="pm" style="margin-top:8px" aria-label="Muskel"><option value="">Alle Muskeln</option>${MUS.map(m=>`<option value="${m.id}">${m.n}</option>`).join('')}</select><ul class="list" id="plist" style="margin-top:8px">${pickList('','')}</ul>`)}
function pickList(q,m){q=q.toLowerCase();return allEx().filter(x=>(!q||x.n.toLowerCase().includes(q))&&(!m||x.p.includes(m))).map(x=>`<li><div class="grow"><b>${esc(x.n)}</b><div class="sm mut">${x.p.map(k=>MN[k]).join(', ')} · ${EQ[x.eq]}</div></div><button class="pri" data-act="pick" data-id="${x.id}">Wählen</button></li>`).join('')}
function infoModal(id){
 const x=exById(id),w=S.weights[id]||{},hi=history(id).slice(-5).reverse(),isC=(S.custom||[]).some(c=>c.id===id);
 modal(`${mhead(esc(x.n))}<span class="tag">${EQ[x.eq]}</span>${figs(m=>x.p.includes(m)?'var(--red)':(x.s||[]).includes(m)?'var(--yel)':'var(--m0)','mini')}
 <div class="legend"><span><i style="background:var(--red)"></i>Hauptmuskel: ${x.p.map(m=>MN[m]).join(', ')||'–'}</span>${(x.s||[]).length?`<span><i style="background:var(--yel)"></i>Mit: ${x.s.map(m=>MN[m]).join(', ')}</span>`:''}</div>
 ${x.set?`<h3 style="margin-top:16px">Einstellen</h3><p>${esc(x.set)}</p>`:''}${x.how?`<h3 style="margin-top:12px">Ausführung</h3><p>${esc(x.how)}</p>`:''}${x.tip?`<h3 style="margin-top:12px">Achte auf</h3><p>${esc(x.tip)}</p>`:''}
 <h3 style="margin-top:16px">Mein Gewicht</h3><form id="wf" data-id="${esc(id)}"><div class="g2"><label class="sm">kg<input type="number" step="0.5" min="0" inputmode="decimal" name="kg" value="${esc(w.kg??'')}"></label><label class="sm">Wdh.<input type="number" min="0" inputmode="numeric" name="r" value="${esc(w.r??'')}"></label></div><label class="sm" style="display:block;margin-top:8px">Notiz (z. B. Sitzhöhe 4, Lehne 2)<input name="note" value="${esc(w.note||'')}"></label><button class="pri" style="margin-top:10px">Speichern</button></form>
 ${hi.length?`<h3 style="margin-top:16px">Verlauf</h3><ul class="list">${hi.map(h=>`<li><span class="grow">${fmtD(h.date)}</span><span class="sm">${h.sets.map(s=>num(s.kg)+'×'+s.r).join(', ')}</span></li>`).join('')}</ul>`:''}
 <div class="row" style="margin-top:16px">${S.draft?`<button class="red" data-act="toDraft" data-id="${esc(id)}">Zum laufenden Training</button>`:`<button data-act="startWith" data-id="${esc(id)}">Training mit dieser Übung starten</button>`}${isC?`<button class="ghost" data-act="delCustom" data-id="${esc(id)}">Eigene Übung löschen</button>`:''}</div>`);
}
function quizModal(){
 const p=S.profile||{},ck=(arr,v)=>arr&&arr.includes(v)?'checked':'';
 const opt=(name,v,t,checked,type='radio')=>`<label class="opt"><input type="${type}" name="${name}" value="${v}" ${checked?'checked':''}><span>${t}</span></label>`;
 modal(`${mhead('Fragebogen')}<form id="quiz"><label class="f" for="qn">Name des Plans</label><input id="qn" name="name" value="${esc(p.name||'Mein Plan')}">
 <fieldset><legend>Was ist dein Hauptziel?</legend><div class="chips">${Object.entries(GOALS).map(([k,g])=>opt('goal',k,g.n,(p.goal||'muskel')===k)).join('')}</div></fieldset>
 <fieldset><legend>Wie viel Erfahrung hast du im Krafttraining?</legend><div class="chips">${Object.entries(LEVELS).map(([k,t])=>opt('level',k,t,(p.level||'anf')===k)).join('')}</div></fieldset>
 <fieldset><legend>An welchen Tagen willst du ins Studio?</legend><div class="chips">${WD.map((w,i)=>opt('days',i,WDL[i],(p.days||['0','2','4']).includes(String(i)),'checkbox')).join('')}</div></fieldset>
 <fieldset><legend>Wie lange pro Einheit?</legend><div class="chips">${[45,60,75,90].map(d=>opt('dur',d,d+' min',String(p.dur||60)===String(d))).join('')}</div></fieldset>
 <fieldset><legend>Welche Ausstattung willst du nutzen?</legend><div class="chips">${['maschine','frei','kabel','koerper'].map(k=>opt('eq',k,EQ[k],p.eq?p.eq.includes(k):true,'checkbox')).join('')}</div></fieldset>
 <fieldset><legend>Schwerpunkte (optional)</legend><div class="chips">${MUS.map(m=>opt('focus',m.id,m.n,ck(p.focus,m.id),'checkbox')).join('')}</div></fieldset>
 <fieldset><legend>Andere Sportarten in deiner Woche</legend><div class="chips">${Object.entries(SPORTS).filter(([k])=>k!=='sonst').map(([k,s])=>opt('sports',k,s.n,ck(p.sports,k),'checkbox')).join('')}</div></fieldset>
 <fieldset><legend>Beschwerden, auf die Rücksicht genommen werden soll</legend><div class="chips">${Object.entries(LIMITS).map(([k,l])=>opt('limits',k,l.n,ck(p.limits,k),'checkbox')).join('')}</div></fieldset>
 <button class="red wide" style="margin-top:22px">Plan erstellen</button></form>`);
}
function sportModal(k){
 k=k||'wandern';
 modal(`${mhead('Sport eintragen')}<form id="sportf"><label class="f">Sportart<select name="sport" id="spsel">${Object.entries(SPORTS).map(([s,v])=>`<option value="${s}" ${s===k?'selected':''}>${v.n}</option>`).join('')}</select></label>
 <div class="g2"><label class="f">Datum<input type="date" name="date" value="${todayISO()}" max="${todayISO()}"></label><label class="f">Dauer (min)<input type="number" name="dur" min="1" inputmode="numeric" required></label></div>
 <div class="g2" id="spf">${sportFields(k)}</div><label class="f">Notiz<input name="note" placeholder="z. B. Route, Ort, Gefühl"></label><button class="pri wide" style="margin-top:16px">Speichern</button></form>`);
}
const sportFields=k=>(SPORTS[k]?.f||[]).map(f=>`<label class="f">${FL[f]}<input name="${f}" ${f==='grade'?'':'type="number" step="any" min="0" inputmode="decimal"'}></label>`).join('');
function showSession(id){
 const s=sessions().find(x=>x.id===id);if(!s)return;
 if(s.type==='gym')modal(`${mhead(esc(s.name))}<p class="mut">${fmtD(s.date)}${s.dur?' · '+s.dur+' min':''}</p><ul class="list">${s.ex.map(e=>`<li><div class="grow"><b>${esc(exById(e.id).n)}</b><div class="sm mut">${e.sets.map(x=>num(x.kg)+' kg × '+x.r).join(' · ')}</div></div></li>`).join('')}</ul>`);
 else modal(`${mhead(esc(SPORTS[s.sport]?.n||'Sport'))}<p class="mut">${fmtD(s.date)} · ${s.dur} min</p>${(SPORTS[s.sport]?.f||[]).filter(f=>s[f]).map(f=>`<p>${FL[f]}: <b>${esc(s[f])}</b></p>`).join('')}${s.note?`<p class="note">${esc(s.note)}</p>`:''}`);
}

/* ================= Pausentimer ================= */
function startRest(sec){if(!sec)return;REST={end:Date.now()+sec*1000};renderRest()}
function renderRest(){
 const el=$('#restbar');if(!REST||!S.draft){el.innerHTML='';return}
 const left=Math.ceil((REST.end-Date.now())/1000);
 if(left<=0){REST=null;el.innerHTML='';toast('Pause vorbei – nächster Satz!');try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}return}
 el.innerHTML=`<div class="restbar"><div role="timer" aria-label="Pause">Pause ${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}<button data-act="rest15">+15 s</button><button data-act="restStop">Stopp</button></div></div>`;
}
setInterval(()=>{if(REST)renderRest();const e=$('#elapsed');if(e&&S.draft)e.textContent=fmtEl(S.draft.t)},1000);

/* ================= Aktionen ================= */
const P=id=>S.plans.find(p=>p.id===id);
const A={
 close:closeModal,
 cfYes(){const c=CF;CF=null;closeModal();c&&c(true)},
 selm(t){const m=t.dataset.m;SEL.has(m)?SEL.delete(m):SEL.add(m);SUG=null;render()},
 clearSel(){SEL.clear();SUG=null;render()},
 suggest(){SUG=suggest([...SEL]);render()},
 sugTog(t){const s=SUG[+t.dataset.i];s.on=!s.on;render()},
 sugSwap(t){const i=+t.dataset.i,cur=exById(SUG[i].id),pr=S.profile||{},alts=allEx().filter(x=>x.eq!=='cardio'&&x.p.some(m=>cur.p.includes(m))&&!SUG.some(s=>s.id===x.id)&&(!pr.eq||!pr.eq.length||pr.eq.includes(x.eq)));if(!alts.length)return toast('Keine Alternative gefunden');SUG[i].id=alts[Math.floor(Math.random()*alts.length)].id;render()},
 sugStart(){const pr=S.profile||{},g=GOALS[pr.goal]||GOALS.muskel,xs=SUG.filter(s=>s.on);if(!xs.length)return toast('Wähle mindestens eine Übung');
  startDraft([...SEL].map(m=>MN[m]).slice(0,3).join(', ')+([...SEL].length>3?' …':''),xs.map(s=>{const x=exById(s.id);return draftEx(s.id,x.c?g.cs:g.is,x.c?g.cr:g.ir,x.c?g.rest:Math.round(g.rest*.75))}));SUG=null;SEL.clear()},
 fillGaps(){const {R}=ratios(PERIOD);SEL=new Set(MUS.filter(m=>R[m.id]<.5).sort((a,b)=>R[a.id]-R[b.id]).slice(0,4).map(m=>m.id));SUG=suggest([...SEL]);location.hash='#heute'},
 async startDay(t){if(S.draft&&!(await confirmDlg('Es läuft schon ein Training. Verwerfen und neu starten?','Neu starten')))return;const p=P(t.dataset.p),d=p.days[+t.dataset.d];startDraft(d.name,d.items.map(it=>draftEx(it.ex,it.sets,it.reps,it.rest)),{plan:p.id,day:+t.dataset.d})},
 startEmpty(){startDraft('Freies Training',[])},
 startWith(t){closeModal();startDraft('Freies Training',[draftEx(t.dataset.id,3,'',90)])},
 toDraft(t){S.draft.ex.push(draftEx(t.dataset.id,3,'',90));persist('state');closeModal();location.hash='#training';render();toast('Hinzugefügt')},
 info(t){infoModal(t.dataset.id)},
 done(t){const e=S.draft.ex[+t.dataset.i],s=e.sets[+t.dataset.j];s.done=!s.done;if(s.done&&!s.r)s.r=parseInt(e.reps)||'';persist('state');render();if(s.done)startRest(e.rest)},
 addSet(t){const e=S.draft.ex[+t.dataset.i],l=e.sets.at(-1)||{kg:''};e.sets.push({kg:l.kg,r:'',done:false});persist('state');render()},
 remSet(t){S.draft.ex[+t.dataset.i].sets.pop();persist('state');render()},
 async remEx(t){if(await confirmDlg('Übung aus dem Training entfernen?','Entfernen')){S.draft.ex.splice(+t.dataset.i,1);persist('state');render()}},
 addEx(){pickEx(id=>{S.draft.ex.push(draftEx(id,3,'',90));persist('state');render()})},
 pick(t){const cb=PICK;PICK=null;closeModal();cb&&cb(t.dataset.id)},
 async finish(){const d=S.draft,ex=d.ex.map(e=>({id:e.id,sets:e.sets.filter(s=>s.done&&+s.r>0).map(s=>({kg:+s.kg||0,r:+s.r}))})).filter(e=>e.sets.length);
  if(!ex.length){if(await confirmDlg('Noch kein Satz abgehakt. Training verwerfen?','Verwerfen')){S.draft=null;REST=null;persist('state');render()}return}
  const s={id:d.id,type:'gym',date:d.date,t:d.t,name:d.name,dur:Math.min(300,Math.max(1,Math.round((Date.now()-d.t)/60000))),ex};if(d.plan){s.plan=d.plan;s.day=d.day}
  addSession(s);ex.forEach(e=>{const top=e.sets.reduce((a,b)=>e1(b)>e1(a)||(+b.kg>+a.kg)?b:a);S.weights[e.id]={...(S.weights[e.id]||{}),kg:top.kg,r:top.r,date:d.date}});
  S.draft=null;REST=null;persist('state');toast(`Gespeichert: ${ex.length} Übungen, ${ex.reduce((a,e)=>a+e.sets.length,0)} Sätze`);location.hash='#fortschritt'},
 async discard(){if(await confirmDlg('Training wirklich verwerfen?','Verwerfen')){S.draft=null;REST=null;persist('state');render()}},
 rest15(){if(REST){REST.end+=15000;renderRest()}},
 restStop(){REST=null;renderRest()},
 sportForm(t){sportModal(t.dataset.s)},
 showS(t){showSession(t.dataset.id)},
 async delS(t){if(await confirmDlg('Diese Einheit löschen?','Löschen')){delSession(t.dataset.id,t.dataset.d);render()}},
 period(t){PERIOD=+t.dataset.n;render()},
 quiz(){quizModal()},
 activate(t){S.active=t.dataset.p;persist('state');render();toast('Plan ist jetzt aktiv')},
 async renameP(t){const p=P(t.dataset.p),v=await promptDlg('Plan umbenennen',p.name);if(v){p.name=v;persist('state');render()}},
 async renameDay(t){const d=P(t.dataset.p).days[+t.dataset.d],v=await promptDlg('Tag umbenennen',d.name);if(v){d.name=v;persist('state');render()}},
 async delP(t){if(await confirmDlg('Plan löschen? Gespeicherte Einheiten bleiben erhalten.','Löschen')){S.plans=S.plans.filter(p=>p.id!==t.dataset.p);if(S.active===t.dataset.p)S.active=S.plans[0]?.id||null;persist('state');render()}},
 addDay(t){const p=P(t.dataset.p);p.days.push({name:'Tag '+(p.days.length+1),items:[]});persist('state');render()},
 planAdd(t){const p=P(t.dataset.p),d=p.days[+t.dataset.d],g=GOALS[p.goal]||GOALS.muskel;pickEx(id=>{const x=exById(id);d.items.push({ex:id,sets:x.c?g.cs:g.is,reps:x.c?g.cr:g.ir,rest:x.c?g.rest:Math.round(g.rest*.75)});persist('state');render()})},
 remItem(t){P(t.dataset.p).days[+t.dataset.d].items.splice(+t.dataset.i,1);persist('state');render()},
 swapItem(t){const p=P(t.dataset.p),d=p.days[+t.dataset.d],it=d.items[+t.dataset.i],cur=exById(it.ex);
  const alts=allEx().filter(x=>x.eq===cur.eq?true:(!p.eq||!p.eq.length||p.eq.includes(x.eq))).filter(x=>x.eq!=='cardio'&&x.p[0]===cur.p[0]&&!excluded(x.id,p)&&!d.items.some(i=>i.ex===x.id));
  if(!alts.length)return toast('Keine passende Alternative');it.ex=alts[Math.floor(Math.random()*alts.length)].id;persist('state');render();toast('Getauscht: '+exById(it.ex).n)},
 editItem(t){const it=P(t.dataset.p).days[+t.dataset.d].items[+t.dataset.i];
  modal(`${mhead('Sätze & Wiederholungen')}<form id="itf" data-p="${t.dataset.p}" data-d="${t.dataset.d}" data-i="${t.dataset.i}"><div class="g2"><label class="f">Sätze<input type="number" name="sets" min="1" max="10" value="${it.sets}"></label><label class="f">Wiederholungen<input name="reps" value="${esc(it.reps)}"></label></div><label class="f">Pause (Sekunden)<input type="number" name="rest" min="0" step="15" value="${it.rest}"></label><button class="pri wide" style="margin-top:14px">Übernehmen</button></form>`)},
 customEx(){modal(`${mhead('Eigene Übung')}<form id="cex"><label class="f">Name<input name="n" required></label><div class="g2"><label class="f">Ausstattung<select name="eq">${Object.entries(EQ).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label><label class="f">Hauptmuskel<select name="p">${MUS.map(m=>`<option value="${m.id}">${m.n}</option>`).join('')}</select></label></div><label class="f">Mittrainiert (optional)<select name="s"><option value="">–</option>${MUS.map(m=>`<option value="${m.id}">${m.n}</option>`).join('')}</select></label><label class="f">Beschreibung<textarea name="how" placeholder="Einstellung, Ausführung, Tipps"></textarea></label><label class="opt" style="display:inline-block;margin-top:12px"><input type="checkbox" name="c"><span>Mehrgelenksübung</span></label><button class="pri wide" style="margin-top:16px">Anlegen</button></form>`)},
 async delCustom(t){if(await confirmDlg('Eigene Übung löschen?','Löschen')){S.custom=S.custom.filter(c=>c.id!==t.dataset.id);persist('state');render()}},
 async copyBk(){const txt=JSON.stringify({app:'trainingsbuch',v:1,exported:new Date().toISOString(),S,LOGS});const o=$('#bkout');o.value=txt;o.style.display='block';
  try{await navigator.clipboard.writeText(txt);toast('Backup in die Zwischenablage kopiert')}catch(e){o.select();toast('Text markiert – bitte manuell kopieren')}},
 async importBk(){let o;try{o=JSON.parse($('#bkin').value)}catch(e){return toast('Das ist kein gültiges Backup')}
  if(!o||!o.S||typeof o.LOGS!=='object')return toast('Das ist kein gültiges Backup');
  if(!(await confirmDlg('Aktuelle Daten durch das Backup ersetzen?','Ersetzen')))return;
  const keep=new Set(Object.values(o.LOGS).flat().map(x=>x.id)),gone=sessions().map(x=>x.id).filter(i=>!keep.has(i));S={...DEF(),...o.S};S.del=(S.del||[]).filter(i=>!keep.has(i)).concat(gone);LOGS=o.LOGS;persistAll();render();toast('Backup wiederhergestellt')},
 async reset(){if(!(await confirmDlg('Wirklich alles löschen?','Alles löschen')))return;const ids=sessions().map(x=>x.id);S=DEF();S.del=ids;LOGS={};persistAll();SEL.clear();SUG=null;render();toast('Alles gelöscht')},
 retry(){syncNow()},
 syncNow(){if(!SC.token)return;DIRTY=true;syncNow().then(()=>{if(VIEW==='daten')render()})},
 logout(){if(SC.token)rpc('tb_logout',{p_token:SC.token}).catch(()=>{});SC.token=null;SC.base=null;saveSC();setSync('lokal');render();toast('Abgemeldet – Daten bleiben auf diesem Gerät')},
 downloadBk(){const txt=JSON.stringify({app:'trainingsbuch',v:1,exported:new Date().toISOString(),S,LOGS});const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));a.download='trainingsbuch-backup-'+todayISO()+'.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);toast('Backup gespeichert')},
 reload(){location.reload()}
};
document.addEventListener('click',e=>{
 const m=e.target.closest('.pick [data-m]');if(m){A.selm(m);return}
 const hm=e.target.closest('.heat [data-m]');if(hm){const {L,R}=ratios(PERIOD),id=hm.dataset.m,mu=MUS.find(x=>x.id===id);$('#heatinfo').innerHTML=`<b>${mu.n}</b>: ${num(L[id])} von etwa ${num(mu.t*PERIOD/7)} Sätzen (${Math.round(R[id]*100)} %). ${R[id]<.5?'Hier lohnt sich mehr Training.':R[id]>=1.6?'Viel Belastung – achte auf Erholung.':'Gut so.'}`;return}
 const t=e.target.closest('[data-act]');if(!t)return;const f=A[t.dataset.act];if(f){e.preventDefault();f(t)}
});
document.addEventListener('toggle',e=>{const d=e.target;if(d.dataset&&d.dataset.pid){const id=d.dataset.pid;if(d.open){OPEN.add(id);OPEN.delete('x'+id)}else{OPEN.delete(id);OPEN.add('x'+id)}}},true);
let dnT;
document.addEventListener('input',e=>{
 const t=e.target,k=t.dataset&&t.dataset.in;
 if(k==='kg'||k==='r'){S.draft.ex[+t.dataset.i].sets[+t.dataset.j][k]=t.value;clearTimeout(dnT);dnT=setTimeout(()=>persist('state'),1500)}
 else if(k==='dname'){S.draft.name=t.value;clearTimeout(dnT);dnT=setTimeout(()=>persist('state'),1500)}
 else if(k==='lq'){LQ=t.value;$('#liblist').innerHTML=libList()}
 else if(t.id==='pq'||t.id==='pm'){$('#plist').innerHTML=pickList($('#pq').value,$('#pm').value)}
});
document.addEventListener('change',e=>{
 const t=e.target,k=t.dataset&&t.dataset.in;
 if(k==='lm'){LM=t.value;$('#liblist').innerHTML=libList()}
 else if(k==='le'){LE=t.value;$('#liblist').innerHTML=libList()}
 else if(k==='prog'){PROG=t.value;render()}
 else if(k==='sched'){const p=P(t.dataset.p),v=t.value;p.schedule[+t.dataset.wd]=!v?null:v[0]==='d'?{d:+v.slice(2)}:{s:v.slice(2)};persist('state')}
 else if(t.id==='spsel'){$('#spf').innerHTML=sportFields(t.value)}
 else if(t.id==='pm'){$('#plist').innerHTML=pickList($('#pq').value,t.value)}
 else if(t.id==='bkfile'&&t.files[0]){t.files[0].text().then(x=>{$('#bkin').value=x;toast('Datei geladen – jetzt „Importieren“')})}
});
document.addEventListener('submit',e=>{
 e.preventDefault();const f=e.target,fd=new FormData(f);
 if(f.id==='quiz'){const a={name:fd.get('name'),goal:fd.get('goal'),level:fd.get('level'),days:fd.getAll('days'),dur:+fd.get('dur'),eq:fd.getAll('eq'),focus:fd.getAll('focus'),sports:fd.getAll('sports'),limits:fd.getAll('limits')};
  if(!a.days.length)return toast('Wähle mindestens einen Trainingstag');if(a.days.length>6)a.days=a.days.slice(0,6);
  S.profile=a;const p=genPlan(a);S.plans.push(p);S.active=p.id;OPEN.add(p.id);persist('state');closeModal();location.hash='#plaene';render();toast('Plan erstellt und aktiv gesetzt')}
 else if(f.id==='sportf'){const sp=fd.get('sport'),s={id:uid(),type:'sport',sport:sp,date:fd.get('date')||todayISO(),t:Date.now(),dur:+fd.get('dur')||0,note:fd.get('note')||''};
  (SPORTS[sp].f||[]).forEach(k=>{const v=fd.get(k);if(v)s[k]=k==='grade'?v:+v});addSession(s);closeModal();render();toast(SPORTS[sp].n+' eingetragen')}
 else if(f.id==='wf'){const id=f.dataset.id;S.weights[id]={kg:fd.get('kg')===''?'':+fd.get('kg'),r:fd.get('r')===''?'':+fd.get('r'),note:fd.get('note')||'',date:todayISO()};persist('state');closeModal();render();toast('Gewicht gespeichert')}
 else if(f.id==='itf'){const it=P(f.dataset.p).days[+f.dataset.d].items[+f.dataset.i];it.sets=Math.max(1,+fd.get('sets')||1);it.reps=fd.get('reps')||it.reps;it.rest=+fd.get('rest')||0;persist('state');closeModal();render()}
 else if(f.id==='cex'){S.custom=S.custom||[];S.custom.push({id:'c-'+uid(),n:fd.get('n'),eq:fd.get('eq'),p:[fd.get('p')],s:fd.get('s')?[fd.get('s')]:[],c:fd.get('c')?1:0,how:fd.get('how')||''});persist('state');closeModal();render();toast('Übung angelegt')}
 else if(f.id==='srv'){SC.url=fd.get('url').trim();SC.key=fd.get('key').trim();saveSC();render();toast('Server gespeichert')}
 else if(f.id==='acc'){const mode=e.submitter&&e.submitter.value||'login',u=fd.get('u').trim().toLowerCase(),pw=fd.get('p');
  rpc(mode==='register'?'tb_register':'tb_login',{p_user:u,p_pw:pw}).then(tok=>{SC.token=tok;SC.user=u;SC.base=null;saveSC();DIRTY=true;toast(mode==='register'?'Konto angelegt':'Angemeldet');return syncNow()}).then(()=>render()).catch(err=>toast(err.message))}
 else if(f.id==='pf'){const c=CF;CF=null;const v=$('#pfv').value.trim();closeModal();c&&c(v||null)}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
let RO;if(window.ResizeObserver){RO=new ResizeObserver(()=>drawChart());RO.observe($('#main'))}
window.addEventListener('hashchange',go);
go();initStore();
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
 navigator.serviceWorker.register('sw.js').then(reg=>{
  const ask=w=>{const d=document.createElement('div');d.className='toast upd';d.style.cssText+='display:flex;gap:12px;align-items:center;padding:6px 6px 6px 18px';d.innerHTML='Neue Version verfügbar <button class="red" style="min-height:38px">Neu laden</button>';d.querySelector('button').onclick=()=>{w.postMessage('skip')};document.body.appendChild(d)};
  if(reg.waiting&&navigator.serviceWorker.controller)ask(reg.waiting);
  reg.addEventListener('updatefound',()=>{const w=reg.installing;w&&w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller)ask(w)})});
  setInterval(()=>reg.update().catch(()=>{}),60*60*1000);
 }).catch(()=>{});
 let reloaded=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!reloaded){reloaded=true;location.reload()}});
}
}
