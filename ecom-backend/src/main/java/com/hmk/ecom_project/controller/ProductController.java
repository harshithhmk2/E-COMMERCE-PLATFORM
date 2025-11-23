package com.hmk.ecom_project.controller;

import com.hmk.ecom_project.model.Product;
import com.hmk.ecom_project.service.ProductService;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService service;

    //    @RequestMapping("/")
//    public String greet(){
//        return "hELLO all";
//    }
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProd() {
        return new ResponseEntity<>(service.getProds(), HttpStatus.OK);
    }

    @GetMapping("/products/{pro}")
    public ResponseEntity<Product> getProductbyID(@PathVariable int pro) {
        Product product = service.getProdbyId(pro);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestPart Product prod, @RequestPart MultipartFile imgFile) {
        try {
            Product prod1 = service.addProduct(prod, imgFile);
            return new ResponseEntity<>(prod1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_IMPLEMENTED);
        }
    }
    @GetMapping("/products/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId){

        Product product = service.getProdbyId(productId);
        byte[] imageFile = product.getImgData();

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageFile);

    }

    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Product product,
                                                @RequestPart MultipartFile imageFile){
        Product product1 = null;
        try {
            product1 = service.setRepo(id, product, imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
        }
        if(product1 != null)
            return new ResponseEntity<>("Updated", HttpStatus.OK);
        else
            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("/products/{pro}")
    public ResponseEntity<?> deleteProd(@PathVariable int pro) {
        Product product1=service.getProdbyId(pro);
        if(product1!=null) {
            service.delProbyId(pro);
            return new ResponseEntity<>("deleted", HttpStatus.ACCEPTED);
        }else
            return new ResponseEntity<>("Deletion Failed",HttpStatus.BAD_REQUEST);
    }

}
