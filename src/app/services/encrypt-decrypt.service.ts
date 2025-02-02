import { Injectable } from '@angular/core';
import { CasinoSocketService } from './casino-socket.service';
import * as forge from 'node-forge';
import { Observable, Subject } from 'rxjs';
import { CONFIG } from '../../../config';


@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  private marketData = new Subject<string>();

  isUnsubscribed: boolean = false;
  previousMsg: any;
  serverPublicKey: any;
  keyPair: any;
  previousGameName: any;
  messageToSocket: any;
  constructor(private socket: CasinoSocketService) {
    this.getMessageFromSocket();
  }
  public getMarketData(): Observable<any> {
    return this.marketData.asObservable();
  }

  public updateMarketData(message: any): void {
    // console.log(message);
    this.marketData.next(message);
  }
  async generateEncryptionKey(gameName: any, messageToSocket?: any) {
    //

    let SocketBaseUrl = this.getBaseUrlofEvent(messageToSocket);

    var url: any;
    this.messageToSocket = messageToSocket;
    if (!this.previousGameName) {
      this.previousGameName = gameName;
    }

    this.keyPair = forge.pki.rsa.generateKeyPair({ bits: 1024 });

    // Encrypt data
    const publicKey = forge.pki.publicKeyToPem(this.keyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(this.keyPair.privateKey);
    const publicKeyBase64 = btoa(publicKey);

    // var url = this.SocketBaseUrl +'/'+gameName.toLowerCase() + '?token=' + publicKeyBase64;
    url = SocketBaseUrl + '?token=' + publicKeyBase64;
    // }




    this.socket.connect(url).subscribe(
      async (message: any) => {
        // this.MessageReader(message);

        // this.checkMsg();
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket connection closed');
        //
        // console.log('reconnecting socket')
        // this.socket.reconnect();
      }

    );



  }


  getBaseUrlofEvent(msg: any) {
    let obj = msg;
    let url = '';

    if (obj.id.startsWith("99.")) {
      const tableId = obj.id.slice(-2); // Extract last 2 digits of obj.id
      url = CONFIG.socketurl == '' ? `wss://${window.location.host}/${CONFIG.casninoTableURL}${tableId}` : `${CONFIG.CasinoSocketUrl}${CONFIG.casninoTableURL}${tableId}`;
    }
    if (obj.id.startsWith("88.")) {
      const tableId = obj.id.slice(-2); // Extract last 2 digits of obj.id
      url = CONFIG.socketurl == '' ? `wss://${window.location.host}/${CONFIG.virtualTableURL}${tableId}` : `${CONFIG.CasinoSocketUrl}${CONFIG.virtualTableURL}${tableId}`;
    }

    return url;
  }
  sendMessageToSocket(message: any) {
    // if(message.type=='2'){
    //   console.log('removing')
    //   this.socket.closeSocket();
    // }
    let msg = JSON.stringify(message)
    if(this.encryptionKey && this.ivhex){
      let encryptedtext = this.encryptUsingNodeForge(msg, this.encryptionKey, this.ivhex);
      this.socket.send(forge.util.encode64(encryptedtext));
    }


  }
  async encryptData(data: any, keyPair: any): Promise<string> {
    try {
      // const jsonData = JSON.stringify(data);
      const encryptedBytes = keyPair.publicKey.encrypt(data);
      const encryptedData = forge.util.encode64(encryptedBytes);
      return encryptedData;
    } catch (error) {
      // console.error('Encryption error:', error);
      throw error;
    }
  }



  decryptData(item: any): string {
    try {
      var concatenatedString: any = ''
      item.forEach((data: any, index: any) => {
        var decryptedString = this.decryptString(data);
        concatenatedString = concatenatedString + decryptedString
      });
      return concatenatedString;
    } catch (error) {
      // console.error('Decryption error:', error);
      throw error;
    }
  }
  getMessageFromSocket() {
    this.counter = 0;
    this.socket.getMarketData().subscribe((data: any) => {
      // console.log('data',data)
      if (data == "WebSocket connection closed" || data == "unsubscribed successfully" || data == null) {
        // this.SocketBaseUrl=''
        this.socket.closeSocket();
        return
      }
      else {
        try {
          let plaindata = JSON.parse(data);
          this.updateMarketData(data)
        } catch (error) {
          // console.log(typeof(data))
          this.MessageReader(data);
        }
      }

    })
  }
  ivhex: any;
  encryptionKey: any;
  counter: any;
  async MessageReader(message: any) {
    // console.log('Received message:', message);
    // Decrypt the data using the private key
    if (message == "WebSocket connection closed" || message == "unsubscribed successfully" || message == null) {
      this.socket.closeSocket();
      return
    }

    const decrptedBuffer = forge.util.decode64(message);

    // console.log('decrypted buffer', message)
    // console.log(decrptedBuffer);
    try {
      var dataParse = JSON.parse(decrptedBuffer);
      if (dataParse?.type == 1) {
        // this.updateMarketData(dataParse)
        return
      }
    } catch (error) {
      // console.log( 'plain text ',decrptedBuffer);
      // this.updateMarketData(decrptedBuffer)
      this.decryptusingNodeforge(decrptedBuffer, this.encryptionKey, this.ivhex);

    }

    if (dataParse) {

      dataParse = JSON.parse(decrptedBuffer);
      // console.log("server data here in objects =====> ", dataParse);
      if (dataParse?.type == 0) {

        this.serverPublicKey = forge.pki.publicKeyFromPem(dataParse.data);
        // console.log(dataParse)
        this.ivhex = this.decryptString(dataParse.iv);
        this.encryptionKey = this.decryptString(dataParse.encryptionKey);

        this.sendMessageToSocket(this.messageToSocket);


      }
      else {

       }

    }
    else {

    }

  }

  decryptusingNodeforge(encryptedHex: any, keyBase64: any, ivHex: any) {

    const keyBytes = forge.util.decode64(keyBase64); // Decode base64-encoded key
    const ivBytes = forge.util.hexToBytes(ivHex); // Convert hex IV to bytes

    const decipher = forge.cipher.createDecipher('AES-CBC', keyBase64);
    decipher.start({ iv: ivBytes });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedHex)));
    decipher.finish();
    const decryptedString = decipher.output.data; // Use without arguments
    this.updateMarketData(decryptedString)

  }
  encryptUsingNodeForge(data: string, keyBase64: string, ivHex: string): string {
    const keyBytes = forge.util.decode64(keyBase64); // Decode base64-encoded key
    const ivBytes = forge.util.hexToBytes(ivHex); // Convert hex IV to bytes

    const cipher = forge.cipher.createCipher('AES-CBC', keyBase64);
    cipher.start({ iv: ivBytes });
    cipher.update(forge.util.createBuffer(data, 'utf8'));
    cipher.finish();

    const encryptedBuffer = cipher.output;

    // Convert the encrypted buffer to a hexadecimal string
    const encryptedHex = forge.util.bytesToHex(encryptedBuffer.data);

    return encryptedHex;
  }
  closeExistingSocket() {
    this.keyPair = null;
    this.counter = 0;
    this.socket.closeSocket();
  }


  decryptString(data: any): any {

    try {
      const decryptedBuffer = forge.util.decode64(data);
      const decrypted = this.keyPair.privateKey.decrypt(decryptedBuffer);
      // console.log('decrypted buffer:', decrypted)
      return decrypted;
    } catch (error) {
      // console.error('Decryption error:', error);
      throw error;
    }
  }
}
