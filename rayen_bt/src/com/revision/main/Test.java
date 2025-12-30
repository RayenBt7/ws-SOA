package com.revision.main;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Test {
    public static void main(String[] args) {
        System.out.println("Démarrage du test...");
        try {
            EntityManagerFactory emf = Persistence.createEntityManagerFactory("revision");
            System.out.println("✅ Connexion réussie !");
            emf.close();
        } catch (Exception e) {
            System.err.println("❌ Erreur : " + e.getMessage());
            e.printStackTrace();
        }
    }
}