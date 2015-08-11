(function () {

    'use strict';

    /* Mapper of transformation data for each Data */
    var MapperService =  function(salesforceWrapperService) {
    }

    /*Map the User from SalesForce and our light user*/
    MapperService.prototype.transformUser = function(aUser){
        if(!aUser){
            return aUser;
        }

        //Take User Detail
        var userDetail =  aUser['userDetail'];

        return userDetail;
    }

    /* Adapt the fields from */
    MapperService.prototype.transformCases = function(aCases){
        if(!aCases || aCases.length ===0){
            return aCases;
        }

        return _.map(aCases, function(aCase){
            if(!aCase){
                return aCase;
            }

            var status = aCase['Status'];
            var contract = (aCase['Contrat__r']) ?  aCase['Contrat__r']['Name'] :  null;

            var createdDate;
            if(aCase['Date_de_la_Reclamation_par_le_Client__c']){

                try{
                    createdDate = Date.create(aCase['Date_de_la_Reclamation_par_le_Client__c']);
                }catch (e){
                    cnsole.log('Error date.create Date réclam', e);

                }
            }
             

            var transfomedCase =  {
                status: status,
                contract: contract,
                number: aCase['CaseNumber'],
                motif: aCase['Motif_insatisfaction__c'],
                date: createdDate,
                idCompte: aCase['Compte__c'],
                idContact: aCase['ContactId'],
                nameContact: aCase['Nom_du_contact__c'],
                principalContract: aCase['Contrat__c'],
                installation: aCase['Installation__c'],
                comment: aCase['Commentaire__c'],
                caseObject: aCase['Subject'],
                description: aCase['Description'],
                id : aCase['Id'],

                isOpen: function(){
                    return aCase['Status'] && aCase['Status'].toLowerCase().indexOf("ouvert")>=0;
                },

                getFormatedDate: function(){
                    var adate = (createdDate) ? createdDate.format("{dd}-{MM}-{yyyy}") : "";
                    return adate;
                }
            }
            return transfomedCase;
        }); 
    }

     /* Adapt the fields from */
    MapperService.prototype.transformContracts = function(aContracts){
        if(!aContracts || aContracts.length ===0){
            return aContracts;
        }

        return _.map(aContracts, function(aContract){

            //Name, Num_ro__c, Date_de_d_but__c, Dur_e_de_base_ans__c, Duree_de_base_mois__c, Reconduction__c, Dur_e_Reconduction__c
            //alert('aContract '+JSON.stringify(aContract));
            return {
                name: aContract['Name'],
                number: aContract['Num_ro__c'],
                startDate: aContract['Date_de_d_but__c'],
                dureeBaseYear: aContract['Dur_e_de_base_ans__c'],
                dureeBaseMonth: aContract['Duree_de_base_mois__c'],
                reconduction: aContract['Reconduction__c'],
                dureeRecondution: aContract['Dur_e_Reconduction__c'],
                id : aContract['Id']
            }
        }); 
    }

 /* Adapt the fields from */
    MapperService.prototype.transformInstallations = function(installations){
        if(!installations || installations.length ===0){
            return installations;
        }

        return _.map(installations, function(install){

            var nameContract ;
            if (install['Affaire__r']   &&   install['Affaire__r']['Contrat__r'] ){
                    nameContract =install['Affaire__r']['Contrat__r']['Name'];
            } 
            var numberContract = "";
            if (install['Affaire__r']   &&   install['Affaire__r']['Contrat__r'] ){
                    numberContract =install['Affaire__r']['Contrat__r']['Num_ro__c'];
            }
            
            return {
                name: install['Nom_Installation__c'],
                number: install['Reference_Externe__c'],
                adress: install['Adresse__c'],
                adressComplementary: install['Ville__c'],
                ville: install['Complement_Adresse__c'],
                numberContract: numberContract,
                nameContract: nameContract,
                id : install['Id']
               
            }
        }); 
    }
    

    MapperService.prototype.transformContacts = function(contacts){
        if(!contacts || contacts.length ===0){
            return contacts;
        }

        return _.map(contacts, function(contact){
            return {
                civilite: contact['Salutation'],
                name: contact['LastName'],
                firstname: contact['FirstName'],
                fonction: contact['Phone'],
                phone: contact['Fonction__c'],
                email: contact['Email'],
                phoneMobile: contact['T_l_phone_mobile__c'],
                telecopy: contact['T_l_copie__c'],
                adress: contact['Adresse__c'],
                adressComplementary: contact['Compl_ment_d_Adresse__c'],
                codePostal: contact['Code_Postal__c'],
                ville: contact['Ville__c'],
                pays: contact['Pays__c'],
                nameAssist: contact['Nom_Assist__c'],
                prenomAssist: contact['Pr_nom_Assist__c'],
                emailAssist: contact['Adresse_mail_assist__c'],
                phoneAssist: contact['T_l_phone_Assistante__c'],
                id : contact['Id']
               
            }
        }); 
    }

    MapperService.prototype.transformAccounts = function(accounts){
        if(!accounts || accounts.length ===0){
            return accounts;
        }
   
        /*
        Id, Name, Adresse__c,Compl_ment_d_Adresse__c,Code_Postal__c,Ville__c,Pays__c,SIRET__c,
        Code_Client_SAP__c
        */
        return _.map(accounts, function(account){
            return {
                name: account['Name'],
                id : account['Id'],
                adress : account['Adresse__c'],
                adressComplementary : account['Compl_ment_d_Adresse__c'],
                postalCode : account['Code_Postal__c'],
                city : account['Ville__c'],
                country : account['Pays__c'],
                siret : account['SIRET__c'],
                sapClientCode : account['Code_Client_SAP__c']
            }
        });
    },

    MapperService.prototype.transformUserAccounts = function(accounts){
        if(!accounts || accounts.length ===0){
            return accounts;
        }

        //Id, AccountId, ContactId, Name

        return _.map(accounts, function(account){
            return {
                name: account['Name'],
                id : account['Id'],
                idCompte : account['AccountId'],
                idContact : account['ContactId']
            }
        });
    }

    MapperService.prototype.transformProfiles = function(profiles){
        if(!profiles || profiles.length ===0){
            return profiles;
        }

        return _.map(profiles, function(profile){
            return {
                id: profile['Id'],
                salutation: profile['Salutation'],
                lastName: profile['LastName'],
                firstName: profile['FirstName'],
                fonction: profile['Fonction__c'],
                phone: profile['Phone'],
                email: profile['Email'],
                phoneMobile: profile['T_l_phone_mobile__c'],
                fax: profile['T_l_copie__c'],
                adress: profile['Adresse__c'],
                adressComplementary: profile['Compl_ment_d_Adresse__c'],
                postalCode: profile['Code_Postal__c'],
                city: profile['Ville__c'],
                country: profile['Pays__c'],
                nameAssistante: profile['Nom_Assist__c'],
                lastnameAssistante: profile['Pr_nom_Assist__c'],
                emailAssistante: profile['Adresse_mail_assist__c'],
                phoneAssistante: profile['T_l_phone_Assistante__c'],

            }
        });
    }

    MapperService.prototype.toSFProfile = function(profile){
      return {

                "Id" : profile.id,
                "Salutation" : profile.salutation,
                "LastName" : profile.lastName,
                "FirstName" : profile.firstName,
                "Fonction__c" : profile.fonction,
                "Phone" : profile.phone,
                "Email" : profile.email,
                "T_l_phone_mobile__c" : profile.phoneMobile,
                "T_l_copie__c" : profile.fax,
                "Adresse__c" : profile.adress,
                "Compl_ment_d_Adresse__c" : profile.adressComplementary,
                "Code_Postal__c" : profile.postalCode,
                "Ville__c" : profile.city,
                "Pays__c" : profile.country,
                "Nom_Assist__c" : profile.nameAssistante,
                "Pr_nom_Assist__c" : profile.lastnameAssistante,
                "Adresse_mail_assist__c" : profile.emailAssistante,
                "T_l_phone_Assistante__c" : profile.phoneAssistante

            }   
    }

    MapperService.$inject = [];

    angular
        .module('app.utils')
        .service('mapperService', MapperService);

    

    

    

})();
